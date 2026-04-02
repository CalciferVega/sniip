export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

class ToastStore {
  toasts = $state<ToastMessage[]>([]);

  add(message: string, type: ToastMessage['type'] = 'info', duration = 3000) {
    const id = crypto.randomUUID();
    this.toasts = [...this.toasts, { id, type, message }];

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  success(message: string) {
    this.add(message, 'success');
  }

  error(message: string) {
    this.add(message, 'error');
  }

  warning(message: string) {
    this.add(message, 'warning');
  }

  info(message: string) {
    this.add(message, 'info');
  }
}

export const toast = new ToastStore();
