<template>
  <q-page class="flex flex-center">
      <q-parallax 
        src="../img/bg7.jpg" 
        :height="2450"
        :speed="1"
        style="margin-top:-100px"
      >

      <q-card class="info my-card q-pa-xs absolute-center">
      <q-card-section vertical>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">informativa</div>
          <div class="text-h4 q-mt-sm q-mb-xs">INFORMATIVA UTENTI e CONSENSO INFORMATO
          AL TAMPONE PER COVID-19 (CORONAVIRUS SARS-COV-2)</div>
          <br><q-separator></q-separator><br>
          <div class="text-h5 text-weight-bold">
              Che cos’è e come si esegue
          </div>
          <div class="text-body1 text-justify">
            Il tampone è un esame rapido (eseguito in pochi secondi) e che permette di rilevare la presenza o meno del virus SARS Cov-2 che è l’agente eziologico del COVID-19 (Corona Virus Disease-2019).
            <br>Il tampone è indolore anche se in alcuni soggetti può risultare fastidioso e viene effettuato inserendo un bastoncino con una sorta di cotton fioc posizionato all’estremità.
            <br>Il tampone viene strofinato leggermente sulla mucosa:
            <ul>
              <li>della faringe posteriore,<br>infilando il tampone in bocca fino ad arrivare nei pressi delle tonsille per il
                  tampone faringeo;</li>
              <li>del naso,<br>inserendo il tampone nelle due narici e procedendo fino a raggiungere la parete
                  posteriore del rinofaringe (parte superiore della faringe).</li>
            </ul>
            L’analisi dei tamponi rino-faringei è l’unico test diagnostico che permette di rilevare la presenza o meno del
            virus SARS Cov-2 che è l’agente eziologico del COVID-19 (Corona Virus Disease-2019). 
            <br>Il tampone viene
            effettuato dal Personale Sanitario addetto al prelievo (infermiere professionale o biologo addetto al prelievo). 
            <br>La fase analitica verrà effettuata mediante l’utilizzo di metodiche PCR a mezzo "Amplificatore delle catene genetiche
          </div>
          <br><q-separator></q-separator><br>
          <div class="text-h5 text-weight-bold">
              Possibili risultati del test:
          </div>
          <div class="text-body1 text-justify">
            <ul>
              <li>Risultato NEGATIVO:<br>non risultano infezioni in corso da virus SARS Cov-2</li>
              <li>Risultato POSITIVO:<br>risulta in corso un’infezione da virus SARS Cov-2</li>
              <li>Risultato INDETERMINATO:<br>la carica virale è bassa</li>
              <li>Risultato NON IDONEO:<br>il materiale raccolto è di scarsa qualità e non sufficiente per l’esame, per cui va ripetuto il prelievo</li>
            </ul>
          </div>
          <br><q-separator></q-separator><br>
          <div class="text-h5 text-weight-bold">
              Limiti del test:
          </div>
          <div class="text-body1 text-justify">
            Il risultato del test è attendibile con una specificità del 95%, non è del tutto esclusa la possibilità che il test generi falsi positivi o falsi negativi. Inoltre, il test “fotografa” la situazione in un determinato momento; è 
            comunque possibile, anche in caso di negatività, che vi sia un’infezione in corso in fase iniziale o che si possa venire infettati in un momento successivo al test.
          </div>
          <br><q-separator></q-separator><br>
          <div class="text-h5 text-weight-bold">
              Il Coronavirus:
          </div>
          <div class="text-body2 text-justify">
              I Coronavirus sono una vasta famiglia di virus noti per causare malattie che vanno dal comune
              raffreddore a malattie più gravi come la Sindrome respiratoria mediorientale (MERS) e la
              Sindrome respiratoria acuta grave (SARS). Ad oggi sono sette i coronavirus
              noti per causare malattie negli esseri umani. Hanno morfologia rotondeggiante e dimensioni di
              100-150 nm di diametro, il loro nome deriva dal fatto che al microscopio elettronico a
              trasmissione, i virioni appaiono sferici con una forma a “corona”. Questo particolare aspetto è
              dovuto alla presenza della proteina spike (dall’inglese punta, spuntone) rappresentata dalla
              glicoproteina (S), formata da due subunità funzionali (S1 e S2) che, nel loro insieme, formano
              una corona che circonda il virione. È la glicoproteina S a determinare la specificità del virus
              per le cellule epiteliali del tratto respiratorio. Le proteine strutturali aggiuntive comprendono:
              l’envelope (E), la proteina di matrice (M) e il nucleocapside (N). Il genoma dei Coronavirus è
              costituito da un singolo filamento di RNA di grande dimensione; non sono noti virus a RNA di
              dimensione maggiore.<br>
              La modalità di trasmissione del SARS-CoV-2, alla luce delle attuali conoscenze è da droplets e
              da contatto con secrezioni respiratorie del paziente, superfici e attrezzature contaminate. Al
              momento non è ancora disponibile un vaccino. Il periodo di incubazione sembra variare da 1 a
              14 giorni, quello di manifestazione della malattia dai 3 ai 7 giorni successivi all’esposizione, ma
              diversi studi hanno evidenziato che può presentarsi anche in maniera asintomatica. Nei
              pazienti sintomatici, i segnali più comuni sono febbre e tosse, ma può presentarsi anche con
              sintomi quali dispnea, dolori muscolari, mal di gola, mal di testa, diarrea, congiuntivite, perdita
              del gusto o dell'olfatto. Nei casi più complessi può evolvere in polmonite condizione che
              richiede il ricovero, nei casi più gravi e urgenti, in terapia intensiva. Le persone più suscettibili
              alle forme gravi sono gli anziani e quelle con patologie croniche come il diabete e le malattie
              cardiache.
          </div>
        </q-card-section>

      </q-card-section>
    </q-card>
    </q-parallax>
    <q-page-scroller position="bottom-right" :scroll-offset="400" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary"></q-btn>
    </q-page-scroller>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Informativa',
});
</script>