import { IoFlowerSharp } from "react-icons/io5";
import style from "./OthersProfile.module.css";
import { BsCardText } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import styled from 'styled-components'
import { Avatar } from "@material-ui/core";
import { useParams } from "react-router";

export const OthersProfile = () => {
    const { isLight } = useSelector((state) => state.color);
    const [showMoreOption, setShowMoreOption] = useState(true);
    const [user, setUser] = useState({})

    const { userId } = useParams();

    useEffect(() => {
        axios.get(`https://reddit-new.herokuapp.com/users/${userId}`)
            .then((res) => {
                setUser(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            })
    })

    return (
        <div
            className={style.OthersProfileContainer}
            style={
                isLight
                    ? { backgroundColor: "#fff", color: "#1a1a1b" }
                    : { backgroundColor: "#1a1a1b", color: "#c8cbcd" }
            }
        >
            <div className={style.blueBackGround}>
                <div>
                    {user.profile_url ?
                        <img src={user.profile_url} alt="" />
                        : <Avatar style={{ width: "85px", fontSize: "50px", height: "85px" }}></Avatar>}

                    <p>{`u/${user.name}`}</p>
                </div>
            </div>

            <div className={style.description}>
                <div className={`${style.padding10} ${style.countDown}`}>
                    <div>
                        <span className={style.boldHeading}>Karma</span>
                        <br />
                        <span className={style.subHeading}>
                            <IoFlowerSharp style={{ color: "#0079d3", marginRight: "3px" }} />
                            <span className={style.subHeading}>743</span>
                        </span>
                    </div>
                    <div>
                        <span className={style.boldHeading}>Cake Day</span>
                        <br />
                        <span>
                            <BsCardText
                                style={{ color: "#0079d3", marginRight: "3px" }}
                                size={10}
                            />
                            <span className={style.subHeading}>Created Jan 27, 2013</span>
                        </span>
                    </div>
                </div>

                <div className={style.buttonContainer}>
                    <button className={style.primaryButton}>Follow</button>
                    <button className={style.primaryButton}>Chat</button>
                </div>
            </div>
            {showMoreOption ? (
                ""
            ) : (
                <div className={style.moreOptionBox}>
                    <button className={style.moreOption}>Send Message</button>
                    <br />
                    <button className={style.moreOption}>Report User</button>
                </div>
            )}
            <div className={style.moreOptionContainer}>
                <button
                    className={style.moreOption}
                    onClick={() => setShowMoreOption(!showMoreOption)}
                >
                    {showMoreOption ? "More Options" : "Fewer Options"}
                </button>
            </div>
        </div>
    );
};
