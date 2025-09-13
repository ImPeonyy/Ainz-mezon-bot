import { CLAN_INVITE_LINK, NAV_LINKS } from "@/constants/constants";

export function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About */}
        <div>
          <h4 className="font-semibold">Ainz Bot</h4>
          <p className="text-sm mt-2 text-slate-600">
            A fun and interactive bot for your server — do daily missions, hunt
            pets, battle with friends, and share memes.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-semibold">Features</h5>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="/daily" className="hover:underline">
                🗓️ Daily rewards
              </a>
            </li>
            <li>
              <a href="/pets" className="hover:underline">
                🐾 Pet hunting
              </a>
            </li>
            <li>
              <a href="/battle" className="hover:underline">
                ⚔️ Battle arena
              </a>
            </li>
            <li>
              <a href="/memes" className="hover:underline">
                😂 Meme generator
              </a>
            </li>
            <li>
              <a href="/memes" className="hover:underline">
                🤪 Action message
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="font-semibold">Contact & Support</h5>
          <p className="text-sm mt-3">
            <a href="mailto:thang.thieuquang@ncc.asia" className="text-blue hover:underline">Support mail</a>
            <br />
            Join our{" "}
            <a
              href={CLAN_INVITE_LINK}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mezon server
            </a>
          </p>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-slate-600 flex flex-col md:flex-row justify-between items-center">
          <span>
            © {new Date().getFullYear()} Ainz Bot. All rights reserved.
          </span>
          <span className="mt-2 md:mt-0"> MORE TOKEN FOR MORE FEATURES ✨</span>
        </div>
      </div>
    </footer>
  );
}
