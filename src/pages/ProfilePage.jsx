// src/pages/ProfilePage.jsx
import React from "react";
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function ProfilePage() {

    const profileData = {
        username: 'Dimas Agus Saputra',
        profileImage: 'dimas.jpg',
        company: 'Universitas Diponegoro',
        location: 'Semarang, Tembalang',
        email: 'agusdimas186@gmail.com',
        group: 'Kelompok 20'
    };

    return (
        <div className="profileWrapper">

            <div className="cardContainer">
                <ProfileItem {...profileData} />
            </div>

            {/* GITHUB CARD */}
            <div className="githubContainer">
                <div className="githubCard">
                    <GitHubIcon style={{ fontSize: 40, marginBottom: 12 }} />
                    <h2 className="githubTitle">Visit My GitHub</h2>
                    <p className="githubDesc">
                        Check out this project and many others in my GitHub repository.
                    </p>

                    <a 
                        href="https://github.com/dimasagussaputra" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="githubButton"
                    >
                        <GitHubIcon style={{ marginRight: 8 }} />
                        View GitHub
                    </a>
                </div>
            </div>

            {/* ================== STYLES ================== */}
            <style>{`
                .profileWrapper {
                    width: 100%;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 60px;
                    padding-bottom: 120px;
                }

                .cardContainer {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .profileItem {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 420px;
                    background: #1e293b;
                    padding: 32px;
                    border-radius: 20px;
                    box-shadow: 0 12px 24px rgba(0,0,0,0.35);
                    color: white;
                    text-align: center;
                    border: 2px solid #ffffff;
                    transition: all 0.25s ease;
                }

                .profileItem:hover {
                    border-color: #3700ffff;
                    box-shadow: 0 0 18px rgba(77,163,255,0.45);
                    transform: translateY(-3px);
                }

                .profileItem img {
                    width: 160px;
                    height: 160px;
                    object-fit: cover;
                    border-radius: 50%;
                    margin-bottom: 18px;
                    border: 4px solid #334155;
                }

                .name {
                    font-size: 1.7rem;
                    margin: 10px 0 18px 0;
                    font-weight: bold;
                }

                .info {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    margin-bottom: 20px;
                }

                .info > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 8px;
                }

                /* ================= GITHUB CARD ================= */
                .githubContainer {
                    margin-top: 40px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .githubCard {
                    width: 420px;
                    background: #1e293b;
                    padding: 28px;
                    border-radius: 18px;
                    color: white;
                    text-align: center;
                    border: 2px solid #ffffff;
                    box-shadow: 0 12px 24px rgba(0,0,0,0.35);
                    transition: 0.25s ease;
                }

                .githubCard:hover {
                    border-color: #3700ffff;
                    box-shadow: 0 0 18px rgba(77,163,255,0.45);
                    transform: translateY(-3px);
                }

                .githubTitle {
                    font-size: 1.4rem;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .githubDesc {
                    font-size: 1rem;
                    opacity: 0.8;
                    margin-bottom: 18px;
                }

                .githubButton {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 12px 20px;
                    background: #087dfaff;
                    border-radius: 10px;
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    font-size: 1rem;
                    transition: 0.25s ease;
                }

                .githubButton:hover {
                    background: #6bb5ff;
                    box-shadow: 0 0 12px rgba(77,163,255,0.45);
                    transform: translateY(-3px);
                }

                /* ================= RESPONSIVE ================= */
                @media (max-width: 768px) {
                    .profileItem, .githubCard {
                        width: 100%;
                        padding: 24px;
                    }
                }
            `}</style>
        </div>
    );
}

/* ================= PROFILE CARD ================= */
function ProfileItem(props) {
    return (
        <div className="profileItem">
            <img src={props.profileImage} alt="profile" />
            <p className="name">{props.username}</p>

            <div className="info">
                <div>
                    <ApartmentIcon style={{ marginRight: 8 }} />
                    {props.company}
                </div>

                <div>
                    <LocationOnIcon style={{ marginRight: 8 }} />
                    {props.location}
                </div>

                <div>
                    <EmailIcon style={{ marginRight: 8 }} />
                    {props.email}
                </div>

                <div>
                    <GroupIcon style={{ marginRight: 8 }} />
                    {props.group}
                </div>
            </div>
        </div>
    );
}
