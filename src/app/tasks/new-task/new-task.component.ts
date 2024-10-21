import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivate, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-new-task',
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: './new-task.component.html',
    styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
    userId = input.required<string>();
    enteredTitle = signal('');
    enteredSummary = signal('');
    enteredDate = signal('');
    submitted = false
    private tasksService = inject(TasksService);
    private router = inject(Router)

    onSubmit() {

        this.tasksService.addTask(
            {
                title: this.enteredTitle(),
                summary: this.enteredSummary(),
                date: this.enteredDate(),
            },
            this.userId()
        );
        this.submitted = true

        this.router.navigateByUrl(`/users/${this.userId()}/tasks`)
    }
}

export const canLeaveEditPage = (component: NewTaskComponent) => {
    if (component.submitted) return true
    if (component.enteredSummary() || component.enteredDate() || component.enteredTitle()) {
        return window.confirm('Leave without saving?')
    }
    return true
}