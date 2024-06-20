import { Injectable, inject } from "@angular/core";
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { SupabaseService } from "src/app/services/data-access/supabase.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _supabaseClient = inject(SupabaseService).supabaseClient;

    constructor(){
        this._supabaseClient.auth.onAuthStateChange((event, session) => {
            console.log(event, session);
        });
    }

    session(){
        return this._supabaseClient.auth.getSession();
    }

    signUp(credentials: SignUpWithPasswordCredentials){
        return this._supabaseClient.auth.signUp(credentials);
    }
    
    logIn(credentials: SignInWithPasswordCredentials){
        return this._supabaseClient.auth.signInWithPassword(credentials);
    }

    signOut(){
        return this._supabaseClient.auth.signOut();
    }

    signUpAsistente(credentials: SignUpWithPasswordCredentials) {
        return this._supabaseClient.auth.signUp(credentials);
    }
}
