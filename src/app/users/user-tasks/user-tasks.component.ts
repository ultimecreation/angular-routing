import { Component, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
    selector: 'app-user-tasks',
    standalone: true,
    templateUrl: './user-tasks.component.html',
    styleUrl: './user-tasks.component.css',
    imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent {
    userName = input.required<string>()
    msg = input.required<string>()

    //alternative 1
    // activatedRoute = inject(ActivatedRoute)
    // ngOnInit(): void {
    //     this.activatedRoute.data.subscribe({
    //         next: data => console.log(data)
    //     })
    // }

    // alternative 2
    // userId = input.required<string>()
    // private usersService = inject(UsersService)
    // destroyRef = inject(DestroyRef)
    // userName = computed(() => this.usersService.users.find(user => user.id === this.userId())?.name)

    // ngOnInit(): void {
    //     console.log("TEST", this.msg())
    //     const subscription = this.activatedRoute.paramMap.subscribe({
    //         next: (paramMap) => {
    //             this.userName = this.usersService.users.find(user => user.id === paramMap.get('userId'))?.name || ''
    //         }
    //     })

    //     this.destroyRef.onDestroy(() => subscription.unsubscribe())
    // }
}


export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
    const usersService = inject(UsersService)
    const userName = usersService.users.find(user => user.id === activatedRoute.paramMap.get('userId'))?.name || ''

    return userName
}

export const resolveTitle: ResolveFn<string> = (activatedRoute, routerState) => {
    return resolveUserName(activatedRoute, routerState) + "'s Tasks"
}