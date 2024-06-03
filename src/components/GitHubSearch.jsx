import React, { useState } from "react";
import "./GitHubSearch.css";
import axios from "axios";
import { FaGithub } from "react-icons/fa";
import { MdOutlinePersonSearch } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMapsHomeWork } from "react-icons/md";

export default function GitHubSearch() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [showRepos, setShowRepos] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setProfile(response.data);
      setRepos([]);
      setShowRepos(false);
      setError(null);
    } catch (error) {
      setProfile(null);
      setRepos([]);
      setShowRepos(false);
      setError("User Not Found");
    }
  };

  const fetchRepos = async () => {
    if (showRepos) {
      setShowRepos(false);
    } else {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        setRepos(response.data);
        setShowRepos(true);
        setError(null);
      } catch (error) {
        setRepos([]);
        setShowRepos(false);
        setError("Repositories Not Found");
      }
    }
  };

  return (
    <>
      <div className="main-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
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
                    Joined: {new Date(profile.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className="profile-bio">{profile.bio}</p>
                <div className="profile-status">
                  <p className="profile-repos">
                    Repositories <br />
                    <span className="status">{profile.public_repos}</span>
                    <br />
                    <button onClick={fetchRepos} className="repo-button">
                      {showRepos ? "Hide Repositories" : "Show Repositories"}
                    </button>
                    {showRepos && repos.length > 0 && (
                      <div className="repo-list">
                        <ul>
                          {repos.map((repo) => (
                            <li key={repo.id} className="repo-list-item">
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {repo.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
            <div className="profile-link">
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
          </div>
        )}
      </div>
    </>
  );
}
