import { useSelector } from "react-redux";
import MusicList from "./common/MusicList";
import styled from "@emotion/styled";
const MenuContainer = styled.div`
    position: fixed;
    width: 976px;
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

const PlayListMenu = ({ showState }) => {
    const playList = useSelector(
        (state) => state.music.value.playList?.payload?.payload
    );

    console.log("playList:", playList);

    return (
        <MenuContainer
            style={
                showState
                    ? { transform: "translate(-50%,-11%)" }
                    : { transform: "translate(-50%,100%)" }
            }
        >
            <div
                style={{
                    fontSize: "1.5rem",
                    position: "sticky",
                    textAlign: "left",
                    padding: "1rem 1rem",
                }}
            >
                当前播放
            </div>
            <div
                style={{
                    fontSize: "0.8rem",
                    color: "rgb(81,81,81",
                    textAlign: "left",
                    padding: "0 1.1rem",
                    marginBottom: "0.5rem",
                }}
            >
                共{playList?.length}首
            </div>
            {playList && (
                <div>
                    {playList.map((item, index) => (
                        <MusicList
                            hiddenImage={true}
                            key={index}
                            songslist={item}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </MenuContainer>
    );
};

export default PlayListMenu;
