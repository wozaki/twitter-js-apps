// import { Marionette } from "backbone.marionette"
import * as Marionette from "backbone.marionette"

export class App extends Marionette.Application {

    constructor() {
        super();

        // var router = new AppRouter({
        //     controller: new Controller(),
        //     routes: {},
        //     appRoutes: appRoutes
        // });
        // router.route;
        //
        // Backbone.history.start({ pushState: false, root: "" });
    }

    onStart() {
        console.log("start---")
    }
}
