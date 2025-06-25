import './globals.css';
import { FaFacebookF, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { UserIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: 'SVVP',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <img src="/images/logo.jpg" className="logo"/>
          <a href="/">Home</a>
          
          <div className="dropdown">
            <a href="/priest">About</a>
            <div className="dropdown-content">
              <a href="/priest">About Priest</a>
              <a href="/leadership">Leadership</a>
            </div>
          </div>

          <a href="/pooja-services">Pooja Services</a>
          <a href="/events">Events</a>

          <div className="dropdown">
            <a href="/donations">Donations</a>
            <div className="dropdown-content">
              <a href="/donations">Donations</a>
              <a href="/saree-sponsorship">Saree Sponsorship</a>
            </div>
          </div>

          <a href="/latest-calender">Latest Calendar</a>
          <a href="/">Media Gallery</a>
          <a href="/">Contact Us</a>
          {/* <a href="/login">Login</a>
          <a href="/account-signup">Sign Up</a> */}
          <a href="/login" className="user-icon-link"><UserIcon className="account"/></a>
        </div>

        <main>{children}</main>

        <footer className="footer">
          <div className="footerColumn">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footerColumn">
            <h3>Contact Us</h3>
            <p>21199 San Jose Rd Tracy CA 95304</p>
            <p>Phone: 925-980-9257</p>
            <p>Email: adminsvvp@svvp.org</p>
          </div>

          <div className="footerColumn">
            <h3>Subscribe & Follow Us</h3>
            <form>
              <input 
                type="email" 
                placeholder="Your email" 
                className="emailInput" 
                required 
              />
              <button type="submit" className="subscribeBtn">Subscribe</button>
            </form>
            <div className="socialIcons">
              <a href="https://www.facebook.com/svvporg/?_rdr"><FaFacebookF size={30} /></a>
              <a href="https://www.youtube.com/user/Vedabharatiusa"><FaYoutube size={30} /></a>
              <a href="https://www.instagram.com/svvphanuman/"><FaInstagram size={30} /></a>
              <a href="https://chat.whatsapp.com/BDbsCulzaRvE2hIQG235PT"><FaWhatsapp size={30} /></a>
            </div>
            <h3>Temple Timings</h3>
              <p>Monday to Sunday: 10:00 AM to 12:00 PM, 6:00 PM to 8:00 PM</p>
          </div>
        </footer>


        <footer style={{ padding: '0.1rem', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
          <p>&copy; 2025 SVVP. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
