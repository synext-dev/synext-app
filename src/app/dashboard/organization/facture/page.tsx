import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MOCK_INVOICES = [
  {
    id: "FAC-2026-003",
    date: "2026-03-01",
    amount: 249,
    status: "paid",
    plan: "Pro",
  },
  {
    id: "FAC-2026-002",
    date: "2026-02-01",
    amount: 249,
    status: "paid",
    plan: "Pro",
  },
  {
    id: "FAC-2026-001",
    date: "2026-01-01",
    amount: 249,
    status: "paid",
    plan: "Pro",
  },
  {
    id: "FAC-2025-012",
    date: "2025-12-01",
    amount: 99,
    status: "paid",
    plan: "Starter",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function FacturePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold text-synext-navy">
          Factures
        </h1>
        <p className="mt-1 text-muted-foreground">
          Historique de vos paiements
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-base">
            Historique des factures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_INVOICES.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm font-medium text-synext-navy">
                      {invoice.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(invoice.date)} · Formule {invoice.plan}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold">
                    {invoice.amount}€
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 hover:bg-green-100"
                  >
                    Payée
                  </Badge>
                  <Button variant="outline" size="sm" className="rounded-full gap-1">
                    <Download className="h-3 w-3" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
