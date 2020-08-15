import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
            // process the obtained error 
            // for logging or monitoring
            console.log("Interceptor Log: " + error.message);
            
            // create new Observable stream 
            // which the clients
            // can subscribe and 
            // catch the Erroneous response
            return throwError(error);
        }));
    }

}