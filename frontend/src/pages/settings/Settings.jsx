import { useData } from "../../context/DataContext";
import "./Settings.css";
import badgeLock from "../../assets/badgeLock.png";
import earlyBird from "../../assets/earlyBird.png";
import reflectiveThinker from "../../assets/reflectiveThinker.png";
import nightOwl from "../../assets/nightOwl.png";
import achievementPro from "../../assets/achievementPro.png";
import goalSetter from "../../assets/goalSetter.png";

const Settings = () => {
  const { user } = useData();

  return (
    <div className="settings">
      <div className="charts">
        {/* Early Bird Badge */}

        {user && user.badges?.earlyBird > 0 ? (
          <div className="badge-card earlyBird">
            <h3>Rise and Shine! You’re officially an Early Bird</h3>
            <div className="img">
              <img className="badge" src={earlyBird} alt="" />
            </div>
            <p>
              You’ve unlocked this badge {user?.badges?.earlyBird} time(s)! Keep
              the streak alive!
            </p>
          </div>
        ) : (
          <div className="badge-card">
            <h3>Unlock the Early Bird Spirit!</h3>
            <div className="img lockBadge">
              <img src={badgeLock} className="badge" alt="" />
            </div>
            <p>
              Write your journal 5 days before 8 a.m. and spread your wings to
              earn this badge
            </p>
          </div>
        )}

        {/* Night Owl Badge */}
        {user && user.badges?.nightOwl > 0 ? (
          <div className="badge-card nightOwl">
            <h3>Midnight Hustler! You’ve earned the Night Owl Badge</h3>
            <div className="img">
              <img className="badge" src={nightOwl} alt="Night Owl Badge" />
            </div>
            <p>
              You’ve unlocked this badge {user?.badges?.nightOwl} time(s)! Keep
              embracing the night vibes!
            </p>
          </div>
        ) : (
          <div className="badge-card">
            <h3>Unlock the Night Owl Power</h3>
            <div className="img lockBadge">
              <img src={badgeLock} className="badge" alt="Locked Badge" />
            </div>
            <p>
              Write your journal 5 days after 10 p.m. to claim this nocturnal
              badge
            </p>
          </div>
        )}

        {/* Achievement Pro Badge */}
        {user && user.badges?.achievementPro > 0 ? (
          <div className="badge-card achievementPro">
            <h3>🏆 You’re unstoppable! Achievement Pro Badge unlocked 🎉</h3>
            <div className="img">
              <img
                className="badge"
                src={achievementPro}
                alt="Achievement Pro Badge"
              />
            </div>
            <p>
              💯 You’ve unlocked this badge {user?.badges?.achievementPro}{" "}
              time(s)! Keep chasing milestones 🚀
            </p>
          </div>
        ) : (
          <div className="badge-card">
            <h3>Your Achievement Pro Badge is waiting!</h3>
            <div className="img lockBadge">
              <img src={badgeLock} className="badge" alt="Locked Badge" />
            </div>
            <p>
              Collect 25 achievements to prove your mastery and claim this
              pro-level badge 🏅
            </p>
          </div>
        )}

        {/* Goal Setter Badge */}
        {user && user.badges?.goalSetter > 0 ? (
          <div className="badge-card goalSetter">
            <h3>🎯 Goal Crusher! You’ve unlocked the Goal Setter Badge 🏅</h3>
            <div className="img">
              <img className="badge" src={goalSetter} alt="Goal Setter Badge" />
            </div>
            <p>✅ Total Goal Setter Badges: {user?.badges?.goalSetter}</p>
          </div>
        ) : (
          <div className="badge-card">
            <h3>🚀 Become a Goal Setter Champion</h3>
            <div className="img lockBadge">
              <img src={badgeLock} className="badge" alt="Locked Badge" />
            </div>
            <p>
              Set daily goals for 7 continuous days to earn this powerful badge
              🎯✨
            </p>
          </div>
        )}

        {/* Reflective Thinker Badge */}
        {user && user.badges?.reflectiveThinker > 0 ? (
          <div className="badge-card reflectiveThinker">
            <h3>
              🧠 Deep Thinker! You’ve unlocked the Reflective Thinker Badge ✨
            </h3>
            <div className="img">
              <img
                className="badge"
                src={reflectiveThinker}
                alt="Reflective Thinker Badge"
              />
            </div>
            <p>
              📖 Total Reflective Thinker Badges:{" "}
              {user?.badges?.reflectiveThinker}
            </p>
          </div>
        ) : (
          <div className="badge-card">
            <h3>🌟 Unlock the Reflective Thinker Badge</h3>
            <div className="img lockBadge">
              <img src={badgeLock} className="badge" alt="Locked Badge" />
            </div>
            <p>
              Write 5 journal entries with 500+ words each to showcase your deep
              reflections 🧘‍♀️
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
