import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HelloComponent } from "./hello.component";
import { HomeComponent } from "./home.component";
import { AppComponent } from "./app.component";

export const routes: Routes = [
  { path: "app", component: AppComponent },
  {
    path: "demo",
    children: [
      { path: "home", component: HomeComponent },
      { path: "demo-next", component: HelloComponent },
      { path: "**", redirectTo: "home" }
    ]
  },

  { path: "**", redirectTo: "demo" }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
