import { greeting } from "@/helpers/greeting";
import { Wrapper } from "@/layouts";
import clsx from "clsx";
import {
  ChevronRight,
  CreditCard,
  Globe,
  IdCard,
  ListCheck,
  Lock,
  Notebook,
  Shield,
  ShoppingCart,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import useCredentials from "@/hooks/useCredentials";
import useNotes from "@/hooks/useNotes";
import useSecretUrls from "@/hooks/useSecretUrls";

export default function Dashboard() {
  const { user, hasSecurityQuestion } = useAuth();
  const { decryptedData } = useCredentials();
  const { decryptedData: notesData } = useNotes();
  const { decryptedData: secretUrlsData } = useSecretUrls();
  const [showNotification, setShowNotification] = useState(true);
  const username = user?.name || "User";

  const navigate = useNavigate();
  const dashboardCards = [
    {
      title: "Auth Credentials",
      value: decryptedData.length,
      icon: Lock,
      path: "credentials",
      color: "text-yellow-500 bg-yellow-500/10",
    },
    {
      title: "Private Notes",
      value: notesData.length,
      icon: Notebook,
      path: "notes",
      color: "text-purple-500 bg-purple-500/10",
    },
    {
      title: "Secret URLs",
      value: secretUrlsData.length,
      icon: Globe,
      path: "secret-urls",
      color: "text-pink-500 bg-pink-500/10",
    },
    {
      title: "ID Information",
      value: 0,
      icon: IdCard,
      path: "id-information",
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: "Credit Cards",
      value: 0,
      icon: CreditCard,
      path: "credit-cards",
      color: "text-green-500 bg-green-500/10",
    },
    {
      title: "To-Do Lists",
      value: 0,
      icon: ListCheck,
      path: "to-do-lists",
      color: "text-red-500 bg-red-500/10",
    },
    {
      title: "Shopping Lists",
      value: 0,
      icon: ShoppingCart,
      path: "shopping-lists",
      color: "text-orange-500 bg-orange-500/10",
    },
  ];

  const handleCardClick = (path: string) => {
    navigate(path);
  };
  return (
    <Wrapper title={greeting(username.split(" ")[0])}>
      <div className="flex flex-col gap-4 h-[calc(100dvh-100px)]">
        {/* Security Question Notification */}
        {!hasSecurityQuestion() && showNotification && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl relative">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 btn dark:text-yellow-500 text-yellow-800 hover:bg-yellow-500/10 p-1 rounded"
            >
              <X size={16} />
            </button>
            <div className="flex items-start gap-3">
              <Shield
                size={20}
                className="dark:text-yellow-500 text-yellow-800 mt-0.5"
              />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium dark:text-yellow-500 text-yellow-800 mb-1">
                  Set Up Security Question
                </p>
                <p className="text-xs text-muted mb-3">
                  Add a security question to recover your passcode if you forget
                  it. This helps prevent account loss.
                </p>
                <Link to="/app/profile">
                  <button className="btn border font-medium border-yellow-800 dark:border-yellow-500 dark:text-yellow-500 text-yellow-800 px-4 py-2 rounded-lg text-xs hover:bg-yellow-500/10">
                    Set Up Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {dashboardCards.map((card) => (
            <div
              key={card.title}
              onClick={() => handleCardClick(card.path)}
              className="space-y-4 cursor-pointer relative dark:bg-secondary bg-background p-4 rounded-2xl border border-line"
            >
              <div
                className={clsx(
                  card.color,
                  "min-w-10 w-10 h-10 center rounded-lg"
                )}
              >
                <card.icon size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-muted">{card.title}</p>
                <p className="text-lg font-space font-medium">{card.value}</p>
              </div>
              <ChevronRight className="absolute right-4 top-4" size={20} />
            </div>
          ))}
        </div>

        <div className="text-center mt-40 pb-20">
          <p className="text-muted text-xs">
            Secure with{" "}
            <span className="font-bold text-yellow-500">AES-256</span>{" "}
            encryption.
          </p>
          <p>
            Built with 😈 by{" "}
            <a
              href="https://github.com/learnwithjacksun/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Gift Jacksun 🤖
            </a>
          </p>
        </div>
      </div>
    </Wrapper>
  );
}
