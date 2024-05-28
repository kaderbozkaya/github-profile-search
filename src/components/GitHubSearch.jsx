import React from "react";
import "./GitHubSearch.css";
import { useState } from "react";
// import "./App.css";
import axios from "axios";
// import { FaGithub } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdOutlinePersonSearch } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMapsHomeWork } from "react-icons/md";

export default function GitHubSearch() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setProfile(response.data);
      setError(null);
    } catch (error) {
      setProfile(null);
      setError("User Not Found");
    }
  };

  return (
    <>
      <div className="main-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            {/* <FaGithub className="github_icon" /> */}
            <input
              className="search-input"
              type="text"
              placeholder="Enter GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="search-button">
              <MdOutlinePersonSearch className="button-icon" />
            </button>
          </div>
        </form>

        {error && <p className="error-msg">{error}</p>}
        {profile && (
          <div className="profile-container">
            <div className="profile-content">
              <div className="profile-img">
                <img
                  className="profile-avatar"
                  src={profile.avatar_url}
                  alt="Avatar"
                />
              </div>
              <div className="profile-details">
                <div className="profile-desc">
                  <h2 className="profile-name">{profile.name}</h2>
                  <p className="profile-created">
                    Joined:
                    {/*buna bak ne demek buu???? */}
                    {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
                {/*rel ne demek niye @ */}
                <p className="profile-bio">{profile.bio}</p>
                <div className="profile-status">
                  <p className="profile-repos">
                    Repositories <br />
                    <span className="status">{profile.public_repos}</span>
                  </p>

                  <p className="profile-followers">
                    Followers <br />
                    <span className="status">{profile.followers}</span>
                  </p>
                  <p className="profile-following">
                    Following <br />
                    <span className="status">{profile.following}</span>
                  </p>
                </div>
                <div className="profile-info">
                  <p className="profile-location">
                    <CiLocationOn />
                    {profile.location}
                  </p>
                  <p className="profile-company">
                    <MdOutlineMapsHomeWork />
                    {profile.company}
                  </p>
                </div>
              </div>
            </div>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
              className="profile-url"
            >
              <FaGithub />
              View Profile
            </a>
          </div>
        )}
      </div>
    </>
  );
}
