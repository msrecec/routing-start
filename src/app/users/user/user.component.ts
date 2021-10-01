import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"],
    };

    /**
     * We subscribe so that we track dynamic changes to the route params
     */

    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params["id"];
      this.user.name = params["name"];
    });
  }

  ngOnDestroy() {
    /**
     * We unsubscribe so that we clear subscriptions (memory leaks etc...), Angular will handle it for us but we can put it anyway
     */

    this.paramsSubscription.unsubscribe();
  }
}
