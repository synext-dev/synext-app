import { PlusCircle, MapPin, Monitor, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_ANNONCES = [
  {
    id: "1",
    title: "Formateur Excel & Power BI",
    specialty: "Digital",
    type: "REMOTE",
    location: null,
    duration: "2 jours",
    status: "active",
    candidatures: 12,
    publishedAt: "2026-03-10",
  },
  {
    id: "2",
    title: "Formateur Management d'équipe",
    specialty: "Management",
    type: "ONSITE",
    location: "Paris",
    duration: "3 jours",
    status: "active",
    candidatures: 8,
    publishedAt: "2026-03-08",
  },
  {
    id: "3",
    title: "Formateur Python & Data Science",
    specialty: "IA",
    type: "REMOTE",
    location: null,
    duration: "5 jours",
    status: "draft",
    candidatures: 0,
    publishedAt: null,
  },
];

export default function OrgAnnoncePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-synext-navy">
            Annonces
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gérez vos offres de formation
          </p>
        </div>
        <Button className="bg-synext-navy text-white hover:bg-synext-navy/90 rounded-full gap-2">
          <PlusCircle className="h-4 w-4" />
          Nouvelle annonce
        </Button>
      </div>

      <div className="grid gap-4">
        {MOCK_ANNONCES.map((annonce) => (
          <Card key={annonce.id}>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-md bg-synext-light flex items-center justify-center">
                    {annonce.type === "REMOTE" ? (
                      <Monitor className="h-5 w-5 text-synext-blue" />
                    ) : (
                      <MapPin className="h-5 w-5 text-synext-blue" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-synext-navy truncate">
                      {annonce.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs rounded-full">
                        {annonce.specialty}
                      </Badge>
                      <Badge variant="secondary" className="text-xs rounded-full">
                        {annonce.type === "REMOTE" ? "En ligne" : annonce.location}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {annonce.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-synext-blue">
                      {annonce.candidatures}
                    </p>
                    <p className="text-xs text-muted-foreground">candidatures</p>
                  </div>
                  <Badge
                    variant={annonce.status === "active" ? "default" : "secondary"}
                    className={
                      annonce.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : ""
                    }
                  >
                    {annonce.status === "active" ? "Publiée" : "Brouillon"}
                  </Badge>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Gérer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
