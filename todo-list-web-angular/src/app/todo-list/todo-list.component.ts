import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  tarefaInput: string = '';
  tarefas: Array<{ texto: string; data: Date; concluida: boolean; prioridade: number }> = [];
  tipoOrdenacao: string = 'data';

  adicionarTarefa() {
    if (this.tarefaInput.trim() !== '') {
      this.tarefas.push({
        texto: this.tarefaInput,
        data: new Date(),
        concluida: false,
        prioridade: 0
      });
      this.tarefaInput = '';
      this.ordenarTarefas();
    }
  }
  setPrioridade(index: number, estrelas: number) {
    this.tarefas[index].prioridade = estrelas;
    this.ordenarTarefas();
  }

  excluirTarefa(index: number) {
    this.tarefas.splice(index, 1);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.adicionarTarefa();
    }
  }

  toggleConcluida(index: number) {
    this.tarefas[index].concluida = !this.tarefas[index].concluida;
    this.ordenarTarefas();
  }

  ordenarTarefas() {
    switch (this.tipoOrdenacao) {
      case 'alfabetica':
        this.tarefas.sort((a, b) => a.texto.localeCompare(b.texto));
        break;
      case 'data':
        this.tarefas.sort((a, b) => b.data.getTime() - a.data.getTime());
        break;
      case 'concluidas':
        this.tarefas.sort((a, b) => {
          if (a.concluida === b.concluida) {
            return b.data.getTime() - a.data.getTime();
          }
          return a.concluida ? 1 : -1;
        });
        break;
      case 'prioridade':
        this.tarefas.sort((a, b) => b.prioridade - a.prioridade);
        break;
    }
  }

  mudarOrdenacao(evento: Event) {
    const select = evento.target as HTMLSelectElement;
    this.tipoOrdenacao = select.value;
    this.ordenarTarefas();
  }
}