import { CanMatchFn, RedirectCommand, Route, Router, Routes, UrlSegment } from "@angular/router";

import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./shared/card/not-found.component";
import { userRoutes } from "./users/users.route";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router)
    const shouldGetAccess = Math.random()
    if (shouldGetAccess < 1) return true


    return new RedirectCommand(router.parseUrl('/unauthorized'))
}

export const routes: Routes = [
    { path: '', component: NoTaskComponent, title: "No Task Selected" },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: userRoutes,
        canMatch: [dummyCanMatch],
        data: {
            msg: 'Hello'
        },
        resolve: {
            userName: resolveUserName
        },
        title: resolveTitle
    },
    { path: '**', component: NotFoundComponent, title: "Not Found" }
]


