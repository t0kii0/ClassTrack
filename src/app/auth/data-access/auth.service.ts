import { Injectable, inject } from "@angular/core";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { SupabaseService } from "src/app/services/data-access/supabase.service";


@Injectable({ providedIn: 'root' })
export class AuthService {
    private _supabaseClient = inject(SupabaseService).supabaseClient;

    constructor(){
        this._supabaseClient.auth.onAuthStateChange((session) => {
            console.log(session);
        });
    }

    session(){
        return this._supabaseClient.auth.getSession();
    }
    
    logIn(credentials: SignUpWithPasswordCredentials){
        return this._supabaseClient.auth.signInWithPassword(credentials);
    }

    signOut(){
        return this._supabaseClient.auth.signOut();
    }
}