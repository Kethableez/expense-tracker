import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { NavigationDesktopComponent } from './shared/navigation/navigation-desktop/navigation-desktop.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotificationsComponent,
    NavigationDesktopComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
