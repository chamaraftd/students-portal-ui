import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentsPortalRoutingModule } from './students-portal/students-portal-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsPortalModule } from './students-portal/students-portal.module';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import { environment } from 'src/environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


const config: SocketIoConfig = { url: environment.websocketUri, options: {} };

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', loadChildren: () => StudentsPortalRoutingModule },
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StudentsPortalModule,
    BrowserAnimationsModule,
    UploadsModule,
    HttpClientModule,
    ApolloModule,
    RouterModule.forRoot(routes),
    SocketIoModule.forRoot(config),
  ],
  exports: [],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.studentMicroservice,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
