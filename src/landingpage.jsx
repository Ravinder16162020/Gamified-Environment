import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './landingpage.module.css';
import BadgesIcon from './assets/Bagesicon.svg';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartSprint = () => {
    navigate('/login');
  };

  return (
    <div className={styles.page}>

      {/* ══════════════════════════════
          NAVBAR
      ══════════════════════════════ */}
      <nav className={styles.navbar}>
        <div className={styles.navInner}>

          {/* Logo */}
          <div className={styles.logo} data-purpose="brand-logo">
            <div className={styles.logoIcon}>
              <span className="material-icons-round">bolt</span>
            </div>
            <span className={styles.logoText}>EcoSprint</span>
          </div>

          {/* Desktop nav links */}
          <div className={styles.desktopMenu} data-purpose="desktop-nav">
            <a className={styles.navLink} href="#hero">Home</a>
            <a className={styles.navLink} href="#features">Modules</a>
            <a className={styles.navLink} href="#leaderboard">Leaderboard</a>
            <a className={styles.navLink} href="#ecobot">About</a>
          </div>

          {/* Mobile hamburger */}
          <div className={styles.mobileMenu}>
            <button className={styles.hamburger} aria-label="Open menu">
              <span className="material-icons-round">menu</span>
            </button>
          </div>

        </div>
      </nav>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <header className={styles.hero} id="hero">
        <div className={styles.heroGlowRight}></div>
        <div className={styles.heroGlowLeft}></div>

        <div className={styles.heroContainer}>
          <div className={styles.heroGrid}>

            {/* Left: text content */}
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot}></span>
                <span className={styles.heroBadgeText}>New Season Live Now</span>
              </div>

              <h1 className={styles.heroHeading}>
                Race to{' '}
                <span className={styles.heroHeadingGradient}>Save the Planet</span>
              </h1>

              <p className={styles.heroSubtext}>
                Level up your climate knowledge, earn Sprint Points, and compete with friends.
                Learning sustainability has never been this competitive.
              </p>

              <div className={styles.heroCtas}>
                <button className={styles.btnPrimary} onClick={handleStartSprint}>
                  Start Your Sprint
                  <span className="material-icons-round">play_arrow</span>
                </button>
                <button className={styles.btnSecondary}>
                  <span className="material-icons-round">smart_toy</span>
                  Meet EcoBot
                </button>
              </div>


            </div>

            {/* Right: image card with floating badges */}
            <div className={styles.heroVisual}>
              <div className={styles.heroImageWrap}>
                <div className={styles.heroImageCard}>
                  <img
                    className={styles.heroImg}
                    alt="Students engaged in collaborative learning outdoors"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3ggra-IuIthNqlXTNHgpQyC9j6OsCasXWZHN7_QFd29JeBU26MU780R9dinfiQ7z_Mzm1RPrZhQNEkRq2VIFyknY3fh3bpqEmrETeE5TIsSmhQwzEMnaSCJWtRXxDBridfl6N8VVUDValtlO592DL6q4dn9LfONqtchAxPGdzH03QAOO-1kx33fEkvY-x9SDk1WMOHKOZ9zK0pP8Rev-RvJWMC61sI-d0ZzWnvMpS7p77Y8wYX5xCyM453pDjIKo9Sj3Dz28EC9Qg"
                  />

                  {/* Rank badge */}
                  <div
                    className={`${styles.badge} ${styles.badgeRank} ${styles.animateFloat}`}
                    style={{ animationDelay: '0.5s' }}
                  >
                    <div className={styles.badgeIconAmber}>
                      <span className="material-icons-round">emoji_events</span>
                    </div>
                    <div>
                      <p className={styles.badgeLabel}>Current Rank</p>
                      <p className={styles.badgeValue}>#1 Sprinter</p>
                    </div>
                  </div>

                  {/* Module complete badge */}
                  <div
                    className={`${styles.badge} ${styles.badgeModule} ${styles.animateFloat}`}
                    style={{ animationDelay: '2s' }}
                  >
                    <div className={styles.badgeIconGreen}>
                      <span className="material-icons-round">check_circle</span>
                    </div>
                    <div>
                      <p className={styles.badgeLabel}>Module Complete</p>
                      <p className={styles.badgeValue}>+500 SP Earned</p>
                    </div>
                  </div>
                </div>

                <div className={styles.heroGlow}></div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ══════════════════════════════
          FEATURES
      ══════════════════════════════ */}
      <section className={styles.features} id="features">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Game Features</span>
            <h3 className={styles.sectionTitle}>Learn to Earn, Play to Save</h3>
          </div>

          <div className={styles.featuresGrid}>
            {/* Card: Modules */}
            <div className={`${styles.featureCard} ${styles['featureCard--green']}`} data-purpose="feature-card">
              <div className={`${styles.featureIcon} ${styles['featureIcon--green']}`}>
                <span className="material-icons-round">school</span>
              </div>
              <h4 className={styles.featureTitle}>Interactive Modules</h4>
              <p className={styles.featureText}>Bite-sized lessons on climate change that adapt to your grade level.</p>
            </div>

            {/* Card: Sprint Points */}
            <div className={`${styles.featureCard} ${styles['featureCard--amber']}`} data-purpose="feature-card">
              <div className={`${styles.featureIcon} ${styles['featureIcon--amber']}`}>
                <span className="material-icons-round">monetization_on</span>
              </div>
              <h4 className={styles.featureTitle}>Sprint Points (SP)</h4>
              <p className={styles.featureText}>Earn virtual currency for every quiz aced. Unlock badges and avatar gear.</p>
            </div>

            {/* Card: EcoBot */}
            <div className={`${styles.featureCard} ${styles['featureCard--blue']}`} data-purpose="feature-card">
              <div className={`${styles.featureIcon} ${styles['featureIcon--blue']}`}>
                <span className="material-icons-round">smart_toy</span>
              </div>
              <h4 className={styles.featureTitle}>24/7 EcoBot</h4>
              <p className={styles.featureText}>Stuck on a tough concept? Our AI tutor explains complex topics instantly.</p>
            </div>

            {/* Card: Rankings */}
            <div className={`${styles.featureCard} ${styles['featureCard--orange']}`} data-purpose="feature-card">
              <div className={`${styles.featureIcon} ${styles['featureIcon--orange']}`}>
                <span className="material-icons-round">leaderboard</span>
              </div>
              <h4 className={styles.featureTitle}>Global Rankings</h4>
              <p className={styles.featureText}>See where you stand against students worldwide. Climb the ranks!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          HOW IT WORKS
      ══════════════════════════════ */}
      <section className={styles.howItWorks} id="how-it-works">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.howTitle}>How to Win the Sprint</h2>
          </div>

          <div className={styles.stepsWrapper}>
            <div className={styles.stepsLine}></div>

            <div className={styles.stepsGrid}>
              {/* Step 1 */}
              <div className={styles.step}>
                <div className={styles.stepCircle}>
                  <span className={styles.stepNumber}>1</span>
                  <span className={styles.stepBadge}>START</span>
                </div>
                <h3 className={styles.stepLabel}>Sign Up</h3>
                <p className={styles.stepText}>Create your student profile and link your school.</p>
              </div>

              {/* Step 2 */}
              <div className={styles.step}>
                <div className={styles.stepCircle}>
                  <span className={styles.stepNumber}>2</span>
                </div>
                <h3 className={styles.stepLabel}>Choose Topics</h3>
                <p className={styles.stepText}>Select from Renewable Energy, Waste Mgmt, or Biodiversity.</p>
              </div>

              {/* Step 3 */}
              <div className={styles.step}>
                <div className={styles.stepCircle}>
                  <span className={styles.stepNumber}>3</span>
                </div>
                <h3 className={styles.stepLabel}>Learn &amp; Sprint</h3>
                <p className={styles.stepText}>Finish bite-sized modules and interactive 3D simulations.</p>
              </div>

              {/* Step 4 */}
              <div className={styles.step}>
                <div className={styles.stepCircle}>
                  <span className={styles.stepNumber}>4</span>
                  <span className={`material-icons-round ${styles.stepStar}`}>star</span>
                </div>
                <h3 className={styles.stepLabel}>Earn &amp; Compete</h3>
                <p className={styles.stepText}>Collect Eco-Points and top the monthly leaderboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          LEADERBOARD
      ══════════════════════════════ */}
      <section className={styles.leaderboard} id="leaderboard">
        <div className={styles.leaderboardInner}>
          <div className={styles.leaderboardGrid}>

            {/* Left: progress copy */}
            <div className={styles.leaderboardCopy}>
              <p className={styles.leaderboardEyebrow}>Progress Overview</p>
              <h2 className={styles.leaderboardHeading}>Master Your Impact</h2>
              <p className={styles.leaderboardDescription}>
                Your progress is tracked every step of the way. Unlock achievements and
                visualize your growth as an environmental leader.
              </p>
              <div className={styles.leaderboardStatsRow}>
                {/* Achievement badges card */}
                <div className={styles.leaderboardStatCard}>
                  <div className={styles.leaderboardStatTopRow}>
                    <div className={styles.leaderboardStatIconWrap}>
                      <img
                        src={BadgesIcon}
                        alt="Achievement badges"
                        className={styles.leaderboardStatIcon}
                      />
                    </div>
                    <div className={styles.leaderboardBadgePill}>7/20 earned</div>
                  </div>
                  <p className={styles.leaderboardStatLabel}>Achievement Badges</p>
                  <div className={styles.leaderboardBadgesRow}>
                    <span className={`${styles.badgeDot} ${styles.badgeDotGreen}`}></span>
                    <span className={`${styles.badgeDot} ${styles.badgeDotOrange}`}></span>
                    <span className={`${styles.badgeDot} ${styles.badgeDotTeal}`}></span>
                    <div className={styles.badgeDotMore}>+17</div>
                  </div>
                </div>

                {/* Earth Explorer card */}
                <div className={styles.leaderboardStatCard}>
                  <div className={styles.leaderboardStatTopRow}>
                    <div className={styles.leaderboardStatIconWrap}>
                      <span className="material-icons-round">show_chart</span>
                    </div>
                    <div className={styles.leaderboardLevelPill}>Level 3</div>
                  </div>
                  <p className={styles.leaderboardStatLabel}>Earth Explorer</p>
                  <div className={styles.leaderboardProgressWrap}>
                    <div className={styles.leaderboardProgressBg}>
                      <div className={styles.leaderboardProgressFill}></div>
                    </div>
                    <p className={styles.leaderboardStatSub}>450 XP to level 4</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: leaderboard card */}
            <div className={styles.leaderboardPanel}>
              <div className={styles.leaderboardCard} data-purpose="leaderboard-card">
                <div className={styles.leaderboardCardHead}>
                  <h3 className={styles.leaderboardCardTitle}>Top Sprinters</h3>
                  <span className={styles.leaderboardSeason}>Global Leaderboard</span>
                </div>

                <div className={styles.leaderboardList}>
              {/* Rank #1 */}
              <div className={styles.leaderboardRow}>
                <div className={styles.rowLeft}>
                  <span className={`${styles.rowRank} ${styles['rowRank--gold']}`}>#1</span>
                  <div className={styles.avatarWrap}>
                    <div className={`${styles.avatar} ${styles['avatar--purple']}`}>P</div>
                    <div className={styles.avatarTrophy}>
                      <span className="material-icons-round">emoji_events</span>
                    </div>
                  </div>
                  <div>
                    <div className={styles.rowNameLine}>
                      <h4 className={styles.rowName}>Priya S.</h4>
                      <img
                        src={BadgesIcon}
                        alt="Top sprinter badge"
                        className={styles.rowBadgeIcon}
                      />
                    </div>
                    <p className={styles.rowMeta}>Grade 10 · Earth Guardian</p>
                  </div>
                </div>
                <div className={styles.rowRight}>
                  <div className={`${styles.rowSp} ${styles['rowSp--gold']}`}>4,250 SP</div>
                  <div className={styles.rowTop1}>Top 1%</div>
                </div>
              </div>

              {/* Rank #2 */}
              <div className={styles.leaderboardRow}>
                <div className={styles.rowLeft}>
                  <span className={`${styles.rowRank} ${styles['rowRank--silver']}`}>#2</span>
                  <div className={styles.avatarWrap}>
                    <div className={`${styles.avatar} ${styles['avatar--blue']}`}>A</div>
                  </div>
                  <div>
                    <h4 className={styles.rowName}>Amit K.</h4>
                    <p className={styles.rowMeta}>College · Ocean Protector</p>
                  </div>
                </div>
                <div className={styles.rowRight}>
                  <div className={`${styles.rowSp} ${styles['rowSp--2nd']}`}>3,920 SP</div>
                </div>
              </div>

              {/* You */}
              <div className={`${styles.leaderboardRow} ${styles.leaderboardRowYou}`}>
                <div className={styles.rowLeft}>
                  <span className={`${styles.rowRank} ${styles['rowRank--you']}`}>#42</span>
                  <div className={styles.avatarWrap}>
                    <div className={`${styles.avatar} ${styles['avatar--you']}`}>Y</div>
                  </div>
                  <div>
                    <h4 className={styles.rowName}>You (EcoWarrior)</h4>
                    <p className={styles.rowMetaYou}>Rookie Tier</p>
                  </div>
                </div>
                <div className={styles.rowRight}>
                  <div className={`${styles.rowSp} ${styles['rowSp--you']}`}>1,200 SP</div>
                  <div className={styles.rowKeepGoing}>Keep going!</div>
                </div>
              </div>
                </div>

                <button className={styles.viewAllBtn}>
                  View Full Leaderboard
                  <span className={`material-icons-round ${styles.viewAllArrow}`}>arrow_forward</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          ECOBOT
      ══════════════════════════════ */}
      <section className={styles.ecobot} id="ecobot">
        <div className={styles.ecobotGlowRight}></div>
        <div className={styles.ecobotGlowLeft}></div>

        <div className={styles.sectionInner}>
          <div className={styles.ecobotGrid}>

            {/* Left: content */}
            <div className={styles.ecobotContent}>
              <div className={styles.ecobotTag}>
                <span className="material-icons-round">auto_awesome</span>
                AI-Powered Learning
              </div>
              <h2 className={styles.ecobotHeading}>
                Meet EcoBot, your personal sustainability coach.
              </h2>
              <p className={styles.ecobotSubtext}>
                Have a question about renewable energy or recycling codes? EcoBot is available 24/7
                to help you learn faster and sprint further.
              </p>
              <ul className={styles.ecobotList}>
                {[
                  'Instant answers to complex climate questions',
                  'Personalized study tips for quizzes',
                  'Fun eco-challenges tailored to you',
                ].map((item) => (
                  <li key={item} className={styles.ecobotListItem}>
                    <div className={styles.ecobotCheckIcon}>
                      <span className="material-icons-round">check_circle</span>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a className={styles.ecobotCta} href="/ecobot">Try EcoBot Free</a>
            </div>

            {/* Right: chat mockup */}
            <div className={styles.chatWrap}>
              <div className={styles.chatBox}>

                {/* Header */}
                <div className={styles.chatHead}>
                  <div className={styles.chatBotInfo}>
                    <div className={styles.chatBotAvatar}>
                      <span className="material-icons-round">smart_toy</span>
                    </div>
                    <div>
                      <p className={styles.chatBotName}>EcoBot</p>
                      <div className={styles.chatStatus}>
                        <span className={styles.chatStatusDot}></span>
                        <span className={styles.chatStatusText}>Active Now</span>
                      </div>
                    </div>
                  </div>
                  <button className={styles.chatMenuBtn}>
                    <span className="material-icons-round">more_vert</span>
                  </button>
                </div>

                {/* Chat body */}
                <div className={styles.chatBody}>
                  {/* Bot greeting */}
                  <div className={styles.chatMsg}>
                    <div className={`${styles.chatAvatar} ${styles['chatAvatar--bot']}`}>
                      <span className="material-icons-round">smart_toy</span>
                    </div>
                    <div className={`${styles.chatBubble} ${styles['chatBubble--bot']}`}>
                      Hi there! 👋 ready to save the planet today? Ask me anything about sustainability!
                    </div>
                  </div>

                  {/* User question */}
                  <div className={`${styles.chatMsg} ${styles.chatMsgReverse}`}>
                    <div className={`${styles.chatAvatar} ${styles['chatAvatar--user']}`}>
                      <span>YOU</span>
                    </div>
                    <div className={`${styles.chatBubble} ${styles['chatBubble--user']}`}>
                      How much water does a dripping faucet waste?
                    </div>
                  </div>

                  {/* Bot answer */}
                  <div className={styles.chatMsg}>
                    <div className={`${styles.chatAvatar} ${styles['chatAvatar--bot']}`}>
                      <span className="material-icons-round">smart_toy</span>
                    </div>
                    <div className={`${styles.chatBubble} ${styles['chatBubble--bot']}`}>
                      A faucet dripping once per second can waste more than{' '}
                      <span className={styles.chatHighlight}>3,000 gallons per year</span>!<br /><br />
                      That's enough for 180 showers. 🚿 Time to fix that leak!
                    </div>
                  </div>
                </div>

                {/* Input bar */}
                <div className={styles.chatInputBar}>
                  <input
                    className={styles.chatInput}
                    type="text"
                    placeholder="Ask about renewable energy..."
                  />
                  <button className={styles.chatSendBtn}>
                    <span className="material-icons-round">send</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer className={styles.footer}>
        <div className={styles.sectionInner}>
          <div className={styles.footerGrid}>

            {/* Brand column */}
            <div className={styles.footerBrand}>
              <div className={styles.footerLogoRow}>
                <div className={styles.footerLogoIcon}>
                  <span className="material-icons-round">bolt</span>
                </div>
                <span className={styles.footerLogoText}>EcoSprint</span>
              </div>
              <p className={styles.footerTagline}>
                Gamifying environmental education for the next generation of planet savers.
                Empowering students through play.
              </p>
              <div className={styles.footerSocials}>
                {['FB', 'X', 'IG'].map((label) => (
                  <a key={label} className={styles.socialBtn} href="/">{label}</a>
                ))}
              </div>
            </div>

            {/* Product links */}
            <div className={styles.footerCol}>
              <h4>Product</h4>
              <ul className={styles.footerLinks}>
                {['Features', 'Modules', 'For Schools', 'Pricing'].map((item) => (
                  <li key={item}>
                    <a className={styles.footerLink} href="/">
                      <span className={styles.footerLinkDot}></span>{item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resource links */}
            <div className={styles.footerCol}>
              <h4>Resources</h4>
              <ul className={styles.footerLinks}>
                {["Blog", "Teacher's Guide", "Community", "Help Center"].map((item) => (
                  <li key={item}>
                    <a className={styles.footerLink} href="/">
                      <span className={styles.footerLinkDot}></span>{item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className={styles.footerNewsletter}>
              <div className={styles.footerCol}>
                <h4>Stay Updated</h4>
              </div>
              <p className={styles.footerNewsletterText}>
                Get the latest eco-challenges and news straight to your inbox.
              </p>
              <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                <input
                  className={styles.newsletterInput}
                  type="email"
                  placeholder="Enter your email"
                />
                <button className={styles.newsletterBtn} type="submit">Subscribe Now</button>
              </form>
            </div>

          </div>

          {/* Bottom bar */}
          <div className={styles.footerBottom}>
            <p>© 2026 ECOSPRINT INC. ALL RIGHTS RESERVED.</p>
            <div className={styles.footerLegal}>
              <a className={styles.footerLegalLink} href="/privacy">PRIVACY POLICY</a>
              <a className={styles.footerLegalLink} href="/terms">TERMS OF SERVICE</a>
              <a className={styles.footerLegalLink} href="/cookies">COOKIES</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
