import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 99,
    period: "mois",
    current: false,
    features: [
      "5 annonces actives",
      "Accès à l'annuaire formateurs",
      "Support email",
      "Tableau de bord basique",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 249,
    period: "mois",
    current: true,
    features: [
      "20 annonces actives",
      "Accès prioritaire aux formateurs",
      "Support prioritaire",
      "Tableau de bord avancé",
      "Statistiques détaillées",
      "Messagerie directe",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 599,
    period: "mois",
    current: false,
    features: [
      "Annonces illimitées",
      "Formateurs dédiés",
      "Support 24/7",
      "Tableau de bord personnalisé",
      "API access",
      "Gestionnaire de compte dédié",
      "SLA garanti",
    ],
  },
];

export default function FormulePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-synext-navy">
          Formule
        </h1>
        <p className="mt-1 text-muted-foreground">
          Gérez votre abonnement Synext
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={plan.current ? "border-synext-blue ring-2 ring-synext-blue" : ""}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-lg">{plan.name}</CardTitle>
                {plan.current && (
                  <Badge className="bg-synext-blue text-white hover:bg-synext-blue">
                    Actuel
                  </Badge>
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-heading text-4xl font-bold text-synext-navy">
                  {plan.price}€
                </span>
                <span className="text-sm text-muted-foreground">/{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full rounded-full ${
                  plan.current
                    ? "bg-synext-navy text-white hover:bg-synext-navy/90"
                    : ""
                }`}
                variant={plan.current ? "default" : "outline"}
                disabled={plan.current}
              >
                {plan.current ? "Formule actuelle" : "Choisir"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
