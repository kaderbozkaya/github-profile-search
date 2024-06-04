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
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showRepos, setShowRepos] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
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
      setFollowers([]);
      setShowFollowers(false);
      setFollowing([]);
      setShowFollowing(false);
      setError(null);
    } catch (error) {
      setProfile(null);
      setRepos([]);
      setShowRepos(false);
      setFollowers([]);
      setShowFollowers(false);
      setFollowing([]);
      setShowFollowing(false);
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
  const fetchFollowers = async () => {
    if (showFollowers) {
      setShowFollowers(false);
    } else {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/followers`
        );
        setFollowers(response.data);
        setShowFollowers(true);
        setError(null);
      } catch (error) {
        setFollowers([]);
        setShowFollowers(false);
        setError("Followers Not Found");
      }
    }
  };
  const fetchFollowing = async () => {
    if (showFollowing) {
      setShowFollowing(false);
    } else {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/following`
        );
        setFollowing(response.data);
        setShowFollowing(true);
        setError(null);
      } catch (error) {
        setFollowing([]);
        setShowFollowing(false);
        setError("Following Not Found");
      }
    }
  };
  console.log(`https://api.github.com/users/${username}/followers`);

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
                    <button onClick={fetchRepos} className="status-button">
                      {showRepos ? "Hide Repositories" : "Show Repositories"}
                    </button>
                    {showRepos && repos.length > 0 && (
                      <div className="status-list">
                        <ul>
                          {repos.map((repo) => (
                            <li key={repo.id} className="list-item">
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
                    <br />
                    <button onClick={fetchFollowers} className="status-button">
                      {showFollowers ? "Hide Followers" : "Show Followers"}
                    </button>
                    {showFollowers && followers.length > 0 && (
                      <div className="status-list">
                        <ul>
                          {followers.map((follower) => (
                            <li key={follower.id} className="list-item">
                              <a
                                href={follower.html_url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {follower.login}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </p>
                  <p className="profile-following">
                    Following <br />
                    <span className="status">{profile.following}</span>
                    <br />
                    <button onClick={fetchFollowing} className="status-button">
                      {showFollowing ? "Hide Following" : "Show Following"}
                    </button>
                    {showFollowing && following.length > 0 && (
                      <div className="status-list">
                        <ul>
                          {following.map((followg) => (
                            <li key={followg.id} className="list-item">
                              <a
                                href={followg.html_url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {followg.login}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
