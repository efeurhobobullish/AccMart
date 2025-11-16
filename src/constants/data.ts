import { Lock, IdCard, CreditCard } from "lucide-react";

export const libraries = [
    "Password Manager",
    "ID Number Vault",
    "Password Strength Checker",
    "Credit Card Vault",
]


export const dashboardCards = [
    {
        title: "Passwords",
        value: 100,
        icon: Lock,
        path: "/passwords"
    },
    {
        title: "ID Numbers",
        value: 100,
        icon: IdCard,
        path: "/id-numbers"
    },
    {
        title: "Credit Cards",
        value: 100,
        icon: CreditCard,
        path: "/credit-cards"
    },
]