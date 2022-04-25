import { Page } from '@playwright/test';


export class ListPage {
    constructor(private page: Page) {
    }

    async goTo(rootUrl: string): Promise<void> {
        await this.page.goto(rootUrl, { waitUntil: 'networkidle' });
        await this.app();
    }

    app() {
        return this.page.locator(`app-list`).waitFor();
    }
    getGridRows() {
        return this.page.locator('tr.mat-row.cdk-row');
    }
}
