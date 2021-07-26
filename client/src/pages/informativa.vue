<template>
  <q-page class="flex flex-center">
    <section>
      <p class="informTitle"> INFORMATIVA UTENTI e CONSENSO INFORMATO  <br> AL TAMPONE PER COVID-19 <br> (CORONAVIRUS SARS-COV-2) </p>
      <div class="inform">
          <h4 class="inform">Che cos’è e come si esegue</h4>   
          <div class="tema">  
            <p class="inform">
                  Il tampone è un esame rapido (eseguito in pochi secondi) e che permette di rilevare la presenza o meno del virus SARS Cov-2 che è l’agente eziologico del COVID-19 (Corona Virus Disease-2019).
                  <br>Il tampone è indolore anche se in alcuni soggetti può risultare fastidioso e viene effettuato inserendo un bastoncino con una sorta di cotton fioc posizionato all’estremità.
                  <br>Il tampone viene strofinato leggermente sulla mucosa:
            </p>
            <ul>
              <li class="inform">della faringe posteriore,<br>infilando il tampone in bocca fino ad arrivare nei pressi delle tonsille per il
                  tampone faringeo;</li>
              <li class="inform">del naso,<br>inserendo il tampone nelle due narici e procedendo fino a raggiungere la parete
                  posteriore del rinofaringe (parte superiore della faringe).</li>
            </ul>
              <p class="inform">
                  L’analisi dei tamponi rino-faringei è l’unico test diagnostico che permette di rilevare la presenza o meno del
                  virus SARS Cov-2 che è l’agente eziologico del COVID-19 (Corona Virus Disease-2019). 
                  <br>Il tampone viene
                  effettuato dal Personale Sanitario addetto al prelievo (infermiere professionale o biologo addetto al
                  prelievo). 
                  <br>La fase analitica verrà effettuata mediante l’utilizzo di metodiche PCR a mezzo "Amplificatore delle catene genetiche"
            </p>
          </div> 
          <h4 class="inform">Possibili risultati del test:</h4> 
          <div class="tema">   
            <ul>
              <li class="inform">Risultato NEGATIVO:<br>non risultano infezioni in corso da virus SARS Cov-2</li>
              <li class="inform">Risultato POSITIVO:<br>risulta in corso un’infezione da virus SARS Cov-2</li>
              <li class="inform">Risultato INDETERMINATO:<br>la carica virale è bassa</li>
              <li class="inform">Risultato NON IDONEO:<br>il materiale raccolto è di scarsa qualità e non sufficiente per l’esame, per cui va ripetuto il prelievo</li>
            </ul>
          </div>
          <h4 class="inform">Limiti del test</h4>  
          <div class="tema">  
            <p class="inform">Il risultato del test è attendibile con una specificità del 95%, non è del tutto esclusa la possibilità che il test generi falsi positivi o falsi negativi. Inoltre, il test “fotografa” la situazione in un determinato momento; è 
                comunque possibile, anche in caso di negatività, che vi sia un’infezione in corso in fase iniziale o che si possa venire infettati in un momento successivo al test.
            </p>
          </div>

      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Informativa',
});
</script>