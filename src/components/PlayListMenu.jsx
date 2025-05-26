import { useSelector, useDispatch } from "react-redux";
import MusicList from "./common/MusicList";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { clearPlayList } from "../app/Slices/music";

const MenuContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 84vh;
    left: 50%;
    bottom: 0;
    border-radius: 10px;
    background: rgb(45, 45, 45);
    padding: 0.5rem 0 0 0;
    overflow: scroll;
    transition-duration: 1.5s;
    z-index: 0;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    position: sticky;
    top: 0;
    background: rgb(45, 45, 45);
    z-index: 1;
`;

const PlayListMenu = ({ showState }) => {
    const dispatch = useDispatch();
    const playList = useSelector(
        (state) => state.music.value.playList?.payload?.payload
    );

    const handleClearPlaylist = () => {
        dispatch(clearPlayList());
    };

    return (
        <MenuContainer
            style={
                showState
                    ? { transform: "translate(-50%,-11%)" }
                    : { transform: "translate(-50%,100%)" }
            }
        >
            <HeaderContainer>
                <div>
                    <div style={{ fontSize: "1.5rem" }}>当前播放</div>
                    <div
                        style={{
                            fontSize: "0.8rem",
                            color: "rgb(81,81,81)",
                            marginTop: "0.5rem",
                            marginBottom: "0.5rem",
                        }}
                    >
                        共{playList?.length || 0}首
                    </div>
                </div>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleClearPlaylist}
                    disabled={!playList?.length}
                >
                    清空
                </Button>
            </HeaderContainer>
            {playList && (
                <div>
                    {playList.map((item, index) => (
                        <MusicList
                            hiddenImage={true}
                            key={index}
                            songslist={item}
                            index={index}
                            showDelete={true}
                        />
                    ))}
                </div>
            )}
        </MenuContainer>
    );
};

export default PlayListMenu;