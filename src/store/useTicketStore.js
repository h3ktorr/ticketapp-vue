import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useTicketStore = defineStore("tickets", {
  state: () => ({
    tickets: JSON.parse(localStorage.getItem("ticketapp_tickets")) || [],
  }),
  actions: {
    saveToStorage() {
      localStorage.setItem("ticketapp_tickets", JSON.stringify(this.tickets));
    },
    createTicket(ticket) {
      this.tickets.push({ id: uuidv4(), ...ticket });
      this.saveToStorage();
    },
    updateTicket(id, data) {
      const index = this.tickets.findIndex((t) => t.id === id);
      if (index !== -1) {
        this.tickets[index] = { ...this.tickets[index], ...data };
        this.saveToStorage();
      }
    },
    deleteTicket(id) {
      this.tickets = this.tickets.filter((t) => t.id !== id);
      this.saveToStorage();
    },
  },
});
