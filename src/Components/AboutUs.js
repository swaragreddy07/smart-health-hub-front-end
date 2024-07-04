// This the About Us page
import styles from "./About.module.css";
import Header from "./Header";

function AboutUs() {
  return (
    <div>
      <Header/>
      <div className={styles.aboutSection}>
        <h1 className={styles.h1}>ABOUT US</h1>
        <div className={styles.introduction}>
          <p className={styles.p}>
            At Smart Health Hub we care about your health and well-being. We
            understand the importance of you health.
          </p>
          <p className={styles.p}>
            Whether you're striving to get well or aiming to stay well, we're
            committed to supporting, guiding, and inspiring you throughout your
            journey. We believe in cutting through the confusion by providing
            straightforward, expert-reviewed, person-first experiences.
          </p>
          <p className={styles.p}>
            Our mission is simple: to help you make the best decisions for
            yourself and the people you love. With Smart Health Hub, you can
            trust that you're in good hands as you navigate the path to optimal
            health and well-being.
          </p>
          <p style={{ fontWeight: 600 }}>
            We want to help you get healthy so you can lead a happy and healthy
            life.
          </p>
          <p className={styles.p}>
            Thank you very much for being here,
            <br />
            SmartHealth Hub Team
          </p>
        </div>
        <hr className={styles.line} />
        <div className={styles.story}>
          <h2 className={styles.h3}>
            We take pride in being one of the fastest-growing healthcare
            websites, dedicated to revolutionizing the way individuals access
            and manage their health information.
          </h2>
          <p className={styles.p}>
            Wheather you are here to learn more about your health condition or
            check your symptoms, book an appointment with our healthcare
            providers or participate in our community driven forums, you are in
            the right place.
          </p>
          <h2 className={styles.h3}>Health Care Providers</h2>
          <p className={styles.p}>
            Our healthcare providers are the best in their field. They are
            well-qualified, experienced, dedicated, and professional. With their
            expertise, you can trust that you're in good hands. At SmartHealth
            Hub, we are proud of our healthcare providers. We believe that our
            healthcare providers are well qualified to handle any medical
            situation.
          </p>
          <button className={styles.button}>Book appintment</button>
        </div>
        <hr className={styles.line} />
        <h2 style={{ marginBottom: "2rem", marginTop: "2rem" }}>
          Testimonials
        </h2>
        <div className={styles.testimonials}>
          <div className={styles.card1}>
            <div className={styles.firstSection}>
              <p className={styles.p}>swarag reddy</p>
              <p style={{ fontSize: "0.7rem", opacity: 0.8 }}>
                -verified user-
              </p>
            </div>
            <div className={styles.secondSection}>
              <h2 className={styles.h2}>SmartHealth Hub transformed my health journey</h2>
            </div>
            <div className={styles.thirdSection}>
              <p className={styles.p}>
                "I want to share how SmartHealth Hub transformed my health
                journey. When I was facing a tough illness, SmartHealth Hub was
                there for me every step of the way. With their helpful
                resources, expert advice, and easy-to-use platform, I felt
                empowered to manage my health confidently. Thanks to SmartHealth
                Hub, I not only learned valuable information but also received
                the support I needed to get healthier. I'm grateful for their
                dedication to making a positive difference in people's lives"
              </p>
            </div>
          </div>
          <div className={styles.card3}>
            <div className={styles.firstSection}>
              <p className={styles.p}>sanjay sharma</p>
              <p style={{ fontSize: "0.7rem", opacity: 0.8 }}>
                -verified healthcare provider-
              </p>
            </div>
            <div className={styles.secondSection}>
              <h2 className={styles.h2}>SmartHealth Hub is a revolutionary health website</h2>
            </div>
            <div className={styles.thirdSection}>
              <p className={styles.p}>
                "Smarthealth Hub has been a game-changer in my mediacal
                practice. Since joining the platform, I am able to connect with
                the patients easily."
              </p>
            </div>
          </div>
          <div className={styles.card2}>
            <div className={styles.firstSection}>
              <p className={styles.p}>karthik myka</p>
              <p style={{ fontSize: "0.7rem", opacity: 0.8 }}>
                -verified user-
              </p>
            </div>
            <div className={styles.secondSection}>
              <h2 className={styles.h2} >Better Health with SmartHealth Hub</h2>
            </div>
            <div className={styles.thirdSection}>
              <p className={styles.p}>
                "I used to have a lot of questions regarding diet, exercise and
                other health related stuff, then I discovered smarthealth hub,
                it completely changed my life. Using this amazing platform I am
                able to track all my health metrics which includes heartbeat,
                blood pressure etc. I can connect to a number of users like me
                on the platform and seek their advice. I can participate in
                community driven health forums."
              </p>
            </div>
          </div>
          <div className={styles.card4}>
            <div className={styles.firstSection}>
              <p className={styles.p}>nitesh kumar</p>
              <p style={{ fontSize: "0.7rem", opacity: 0.8 }}>
                -verified pharmacist-
              </p>
            </div>
            <div className={styles.secondSection}>
              <h2 className={styles.h2}>
                Medication Tracking and Dispensation made easy by SmartHealth
                Hub
              </h2>
            </div>
            <div className={styles.thirdSection}>
              <p className={styles.p}>
                "The process Medication dispensation is greatly simplified by
                smarthealth hub. I am able to easily look at a patient's
                medication record and quickly take a decision."
              </p>
            </div>
          </div>
        </div>
        <hr className={styles.line} />
      </div>
    </div>
  );
}

export default AboutUs;
