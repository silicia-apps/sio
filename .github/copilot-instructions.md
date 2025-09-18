# Istruzioni per Agenti AI - Silicia Ionic Framework (SIO)

## Panoramica dell'Architettura

SIO è un framework per sviluppare applicazioni ibride basate su Ionic/Angular con integrazione dello stato e funzionalità comuni preconfigurate.

### Struttura del Progetto
- `/libs/` - Librerie core modulari:
  - `core/` - Funzionalità base e utilità
  - `auth/` - Gestione autenticazione 
  - `database/` - Accesso al database
  - `storage/` - Gestione file e storage
  - `appwrite/` - Implementazione backend Appwrite
  - `chat/` - Funzionalità di chat

### Pattern Chiave

1. **Gestione dello Stato**
   - Utilizzo di NGXS per state management
   - Integrazione con angular-ru/ngxs per funzionalità estese
   - Decoratori e pattern specifici per la gestione dello stato

2. **Internazionalizzazione**
   - Sistema integrato tramite ngx-translate
   - File di traduzione in formato JSON
   - Utilizzo di `translate` pipe nei template

3. **Struttura Modulare**
   - `SioCoreModule.forRoot()` nel modulo principale
   - `SioCommonModule` in ogni lazy-loaded module
   - Plugin backend (Appwrite/Firebase) caricati separatamente

## Workflow di Sviluppo

### Comandi Essenziali
```bash
nx test <lib-name>     # Esegui test per una libreria
nx build <lib-name>    # Compila una libreria
nx serve demo          # Avvia l'app demo
```

### Best Practices
1. Importa sempre `SioCoreModule.forRoot(environment)` solo nel modulo principale
2. Usa `SioCommonModule` in ogni modulo lazy-loaded che necessita dei componenti SIO
3. Configura il backend nel file environment.ts prima di inizializzare i moduli

## Punti di Integrazione

### Backend Appwrite
```typescript
@NgModule({
  imports: [
    SioAppwriteAuth(environment),
    SioAppwriteDatabase(environment),
    SioAppwriteStorage(environment)
  ]
})
```

### Componenti Custom
- Usa il componente base `<sio-app>` come root component
- Estendi i componenti Ionic esistenti con funzionalità SIO
- Integra form dinamici e menu attraverso i componenti SIO

## Note Importanti
- Il progetto è in fase pre-alpha - prevedi possibili breaking changes
- Riferisciti alla documentazione su GitBook per le ultime updates
- I test E2E sono in Cypress (/apps/demo-e2e)
- La struttura delle librerie segue il pattern monorepo NX

## File Chiave da Consultare
- `/apps/demo/src/app/app.module.ts` - Esempio di configurazione
- `/libs/core/src/index.ts` - API pubbliche del core
- `/libs/*/src/lib/*.state.ts` - Definizioni degli stati NGXS