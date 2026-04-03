import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function OrgProfilPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-heading text-3xl font-bold text-synext-navy">
          Profil
        </h1>
        <p className="mt-1 text-muted-foreground">
          Informations de votre organisme
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-base">
            Informations générales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-synext-light flex items-center justify-center">
              <span className="font-heading text-xl font-bold text-synext-navy">KA</span>
            </div>
            <div>
              <p className="text-sm font-medium">Logo de l&apos;organisme</p>
              <Button variant="outline" size="sm" className="rounded-full mt-1">
                Modifier le logo
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-1.5">
              <Label>Nom de l&apos;organisme</Label>
              <Input defaultValue="Keyce Academy" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Email de contact</Label>
                <Input defaultValue="contact@keyce.fr" type="email" />
              </div>
              <div className="space-y-1.5">
                <Label>Téléphone</Label>
                <Input defaultValue="+33 1 23 45 67 89" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Adresse</Label>
              <Input defaultValue="15 rue de la Formation, 75001 Paris" />
            </div>
            <div className="space-y-1.5">
              <Label>Site web</Label>
              <Input defaultValue="https://keyce.fr" />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                defaultValue="Keyce Academy est un organisme de formation spécialisé dans les métiers du digital, du management et des nouvelles technologies."
                rows={4}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Domaines de formation</Label>
            <div className="flex flex-wrap gap-2">
              {["Digital", "Management", "IA", "Finance", "Marketing"].map((d) => (
                <Badge key={d} variant="secondary" className="rounded-full">
                  {d}
                </Badge>
              ))}
            </div>
          </div>

          <Button className="bg-synext-navy text-white hover:bg-synext-navy/90 rounded-full">
            Enregistrer les modifications
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
