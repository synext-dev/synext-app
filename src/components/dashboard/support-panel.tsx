"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ChevronDown, MessageCircle, Ticket, HelpCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type {
  TrainerSupportData,
  ChatMessage,
  SupportTicket,
  TicketCategory,
  TicketStatus,
} from "@/types";

interface SupportPanelProps {
  data: TrainerSupportData;
}

const CATEGORY_LABELS: Record<TicketCategory, string> = {
  technical: "Technique",
  billing: "Facturation",
  account: "Compte",
  other: "Autre",
};

const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; className: string }
> = {
  open: { label: "Ouvert", className: "bg-blue-100 text-blue-700" },
  in_progress: { label: "En cours", className: "bg-amber-100 text-amber-700" },
  resolved: { label: "Résolu", className: "bg-green-100 text-green-700" },
  closed: { label: "Fermé", className: "bg-muted text-muted-foreground" },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Chat Tab ──────────────────────────────────────────────
function ChatTab({ initialMessages }: { initialMessages: ChatMessage[] }) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      from: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const agentMsg: ChatMessage = {
        id: `msg-${Date.now()}-agent`,
        from: "agent",
        content: "Merci pour votre message ! Un agent Synext va vous répondre sous peu.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 800);
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b">
        <div className="h-8 w-8 rounded-full bg-synext-light flex items-center justify-center">
          <span className="text-xs font-bold text-synext-navy">SX</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-synext-navy">Support Synext</p>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">Agent disponible</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {msg.from === "agent" && (
              <div className="h-7 w-7 shrink-0 rounded-full bg-synext-light flex items-center justify-center mb-0.5">
                <span className="text-[10px] font-bold text-synext-navy">SX</span>
              </div>
            )}
            <div
              className={`max-w-[72%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.from === "user"
                  ? "bg-synext-navy text-white rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t flex items-center gap-2">
        <Input
          placeholder="Écrire un message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 rounded-full"
        />
        <Button
          size="icon"
          className="rounded-full bg-synext-navy text-white hover:bg-synext-blue shrink-0"
          onClick={sendMessage}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ── Tickets Tab ───────────────────────────────────────────
function TicketsTab({ initialTickets }: { initialTickets: SupportTicket[] }) {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<TicketCategory>("technical");
  const [message, setMessage] = useState("");

  function handleSubmit() {
    if (!subject.trim() || !message.trim()) {
      toast.error("Veuillez remplir le sujet et le message.");
      return;
    }
    const newTicket: SupportTicket = {
      id: `tk-${Date.now()}`,
      subject: subject.trim(),
      category,
      status: "open",
      createdAt: new Date().toISOString(),
      preview: message.trim().slice(0, 80) + "...",
    };
    setTickets((prev) => [newTicket, ...prev]);
    setSubject("");
    setCategory("technical");
    setMessage("");
    toast.success("Ticket créé avec succès (mock)");
  }

  const sorted = [...tickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Create */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full bg-synext-blue" />
          <h3 className="font-heading text-base font-semibold text-synext-navy">
            Créer un ticket
          </h3>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Sujet</Label>
            <Input
              placeholder="Décrivez votre problème en quelques mots..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Catégorie</Label>
            <select
              className="w-full rounded-lg border px-3 py-2 text-sm bg-background"
              value={category}
              onChange={(e) => setCategory(e.target.value as TicketCategory)}
            >
              <option value="technical">Problème technique</option>
              <option value="billing">Facturation</option>
              <option value="account">Profil &amp; Compte</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Message</Label>
            <textarea
              rows={4}
              placeholder="Décrivez votre problème en détail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm bg-background resize-none focus:outline-none focus:ring-2 focus:ring-synext-blue/30"
            />
          </div>
          <Button
            className="rounded-full bg-synext-navy text-white hover:bg-synext-blue"
            onClick={handleSubmit}
          >
            Envoyer le ticket
          </Button>
        </div>
      </div>

      {/* History */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <div className="w-1 h-5 rounded-full bg-synext-blue" />
          <h3 className="font-heading text-base font-semibold text-synext-navy">
            Historique
          </h3>
        </div>
        <div className="divide-y">
          {sorted.map((ticket) => {
            const status = STATUS_CONFIG[ticket.status];
            return (
              <div key={ticket.id} className="px-6 py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs text-muted-foreground font-mono">
                      #{ticket.id}
                    </span>
                    <Badge className={`rounded-full text-xs px-2 py-0 ${status.className}`}>
                      {status.label}
                    </Badge>
                    <Badge variant="secondary" className="rounded-full text-xs px-2 py-0">
                      {CATEGORY_LABELS[ticket.category]}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">
                    {ticket.subject}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {ticket.preview}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground shrink-0 text-right">
                  <p>{formatDate(ticket.createdAt)}</p>
                  {ticket.lastReply && (
                    <p className="mt-0.5">Rép. {formatDate(ticket.lastReply)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── FAQ Tab ───────────────────────────────────────────────
function FaqTab({ items }: { items: TrainerSupportData["faq"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden divide-y">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              className="w-full flex items-center justify-between gap-3 px-6 py-4 text-left hover:bg-muted/40 transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="text-sm font-medium text-foreground">
                {item.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <p className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ────────────────────────────────────────
export function SupportPanel({ data }: SupportPanelProps) {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-bold text-synext-navy">Support</h1>

      <Tabs defaultValue={0}>
        <TabsList className="w-full justify-start h-auto p-1">
          <TabsTrigger value={0} className="flex items-center gap-2 px-4 py-2">
            <MessageCircle className="h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value={1} className="flex items-center gap-2 px-4 py-2">
            <Ticket className="h-4 w-4" />
            Mes tickets
          </TabsTrigger>
          <TabsTrigger value={2} className="flex items-center gap-2 px-4 py-2">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value={0}>
          <ChatTab initialMessages={data.chatHistory} />
        </TabsContent>

        <TabsContent value={1}>
          <TicketsTab initialTickets={data.tickets} />
        </TabsContent>

        <TabsContent value={2}>
          <FaqTab items={data.faq} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
