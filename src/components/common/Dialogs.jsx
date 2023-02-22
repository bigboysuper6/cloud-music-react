import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link } from "@mui/material";
import MusicLogo from "../../assets/logo.jpg";
import { default as styledCommon } from "@emotion/styled";
import {
    loginQrCreate,
    loginQrCheck,
    loginQrKey,
    loginStatus,
} from "../../api/login";

const BootstrapDialog = styled(Dialog)({
    "& .MuiPaper-root": {
        backgroundColor: "rgb(37,37,37)",
        borderRadius: "0.625rem",
    },
});

const LoginQrContent = styled(DialogContent)({
    width: "500px",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    border: "0.06rem solid rgb(45,45,45)",
    borderRadius: "0.625rem",
});

const Title = styled(Typography)({
    fontSize: "20px",
    fontWeight: "bold",
    color: "rgb(180,180,180)",
});

const QrImgContainer = styled(Box)({
    width: "350px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});

const QrImgPrompt = styled(Typography)({
    fontSize: "15px",
    color: "rgb(180,180,180)",
    fontWeight: "500",
});
const LoginMethods = styled(Typography)({
    fontSize: "10px",
    color: "rgb(180,180,180)",
});
const LoginMethodsLinks = styled(Link)({});
const LogoImg = styledCommon.img`
  width:50px;
  height:50px;
  border: 0.06rem solid rgb(45,45,45);
  border-radius: 0.625rem;
`;
const QrImg = styledCommon.img`
  border: 0.06rem solid rgb(45,45,45);
  border-radius: 0.625rem;
  width:300px;
  height:300px;
`;

export default function Dialogs(props) {
    const intervalRef = React.useRef();
    const keyRef = React.useRef();
    const qruseRef = React.useRef();
    const qrimgRef = React.useRef();
    //二维码是否可用
    const [qrUse, setQrUse] = React.useState(false);
    //二维码base64编码
    const [qrimg, setQrimg] = React.useState("");
    //二维码钥匙
    const [qrkey, setQrkey] = React.useState("");
    //登录提示
    const [prompt, setprompt] = React.useState("请打开 app 扫码登录");
    React.useEffect(() => {
        if (props.open && qrUse) qrlogin();
        qruseRef.current = qrUse;
    }, [props.open]);
    React.useEffect(() => {
        if (qrimg === "" && props.open) {
            console.log("第一次");
            qrlogin();
        }
        //如果对话框关闭 停止检测二维码状态
        if (!props.open) {
            console.log("结束检测");
            clearInterval(intervalRef.current);
        }
        if (props.open && qrimgRef.current) qrimgRef.current.src = qrimg;
    }, [props.open, qrimg]);

    React.useEffect(() => {
        if (props.open && prompt === "二维码已过期,请重新扫码") {
            console.log("第二次");
            qrlogin();
        }
        //获取 钥匙 和 二维码是否可用 和 二维码图像的最新值
        keyRef.current = qrkey;
    }, [prompt, props.open, qrkey]);

    async function qrlogin() {
        //如果二维码不可用 则重新请求数据,如果二维码依旧可用,就可以跳过这一步
        if (!qruseRef.current) {
            const { data: key_data } = await loginQrKey({
                timerstamp: Date.now(),
            });
            const { data: qr_data } = await loginQrCreate({
                qrimg: true,
                key: key_data.data.unikey,
                timerstamp: Date.now(),
            });
            console.log("钥匙数据", key_data);
            console.log("二维码数据", qr_data);
            setQrUse(true);
            setQrimg(qr_data.data.qrimg);
            setQrkey(key_data.data.unikey);
        }
        // 每隔 3000 毫秒检测一次二维码的状态
        let qrlogincheck = setInterval(async () => {
            const { data: code_data } = await loginQrCheck({
                key: keyRef.current,
                timerstamp: Date.now(),
            });
            console.log("二维码状态数据", code_data);
            // 如果超时 将二维码设置为不可用 同时终止检测 并将提示重新设置
            if (code_data.code === 800) {
                clearInterval(qrlogincheck);
                setprompt("二维码已过期,请重新扫码");
                setQrUse(false);
            }
            //如果扫码成功 将二维码设置为不可用
            if (code_data.code === 803) {
                setprompt("授权登录成功");
                await loginStatus({
                    timerstamp: Date.now(),
                });
                localStorage.setItem("cookie", code_data.cookie);
                clearInterval(qrlogincheck);
                setQrUse(false);
                window.location.reload();
                props.handleUsrReload();
            }
        }, 3000);
        //将 qrlogincheck暴露出来 在 useEffect 中登录框消失时可以终止它
        intervalRef.current = qrlogincheck;
    }
    return (
        <div>
            <BootstrapDialog
                onClose={props.handleOpenState}
                aria-labelledby="customized-dialog-title"
                open={props.open}
                disablePortal
            >
                <LoginQrContent>
                    <LogoImg src={MusicLogo} alt="logo"></LogoImg>
                    <Title>登录网易云账号</Title>
                    <QrImgContainer>
                        <QrImg ref={qrimgRef}></QrImg>
                        <QrImgPrompt>{prompt}</QrImgPrompt>
                    </QrImgContainer>
                    <LoginMethods>
                        <LoginMethodsLinks>邮箱号登录</LoginMethodsLinks>|
                        <LoginMethodsLinks>手机号登录</LoginMethodsLinks>
                    </LoginMethods>
                </LoginQrContent>
            </BootstrapDialog>
        </div>
    );
}
