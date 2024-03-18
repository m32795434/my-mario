import Matter from "matter-js";
import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Background } from "./Background";
import { Hero } from "./Hero";
import { Platforms } from "./Platforms";

export class Game extends Scene {
    create() {
        this.createBackground();
        this.createPlatforms();
        this.createHero();
        this.setEvents();
    }
    setEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        console.log("colliders: ", colliders)
        const hero = colliders.find(body => body.gameHero);
        console.log("hero: ", hero)
        const platform = colliders.find(body => body.gamePlatform);

        if (hero && platform) {
            this.hero.stayOnPlatform(platform.gamePlatform);
        }

        const diamond = colliders.find(body => body.gameDiamond);

        if (hero && diamond) {
            this.hero.collectDiamond(diamond.gameDiamond);
        }

    }
    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
    }
    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);
        this.container.interactive = true;
        this.container.on("pointerdown", () => {
            console.log("Jumpng!")
            this.hero.startJump();
        });
    }
    createPlatforms() {
        this.platfroms = new Platforms();
        this.container.addChild(this.platfroms.container);
    }
    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }
    update(dt) {
        this.bg.update(dt);
        this.platfroms.update(dt);
    }
}
