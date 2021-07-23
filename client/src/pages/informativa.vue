<template>
  <q-page class="flex flex-center">
    <section>
      <h2 class="text-center"> INFORMATIVA UTENTI e CONSENSO INFORMATO AL TAMPONE PER COVID-19 (CORONAVIRUS SARS-COV-2) </h2>
      <div class="chiSiamo">
          <h4>Che cos’è e come si esegue</h4>      
          <p>
                Il tampone è un esame rapido (eseguito in pochi secondi) e che permette di rilevare la presenza o meno del virus SARS Cov-2 che è l’agente eziologico del COVID-19 (Corona Virus Disease-2019).
                Il tampone è indolore anche se in alcuni soggetti può risultare fastidioso e viene effettuato inserendo un bastoncino con una sorta di cotton fioc posizionato all’estremità. Il tampone viene strofinato leggermente sulla mucosa:
          </p>
          <ul>
            <li>della faringe posteriore, infilando il tampone in bocca fino ad arrivare nei pressi delle tonsille per il
                tampone faringeo;</li>
            <li>del naso, inserendo il tampone nelle due narici e procedendo fino a raggiungere la parete
                posteriore del rinofaringe (parte superiore della faringe).</li>
          </ul>
            <p>
                L’analisi dei tamponi rino-faringei è l’unico test diagnostico che permette di rilevare la presenza o meno del
                virus SARS Cov-2 che è l’agente eziologico del COVID-19 (Corona Virus Disease-2019). Il tampone viene
                effettuato dal Personale Sanitario addetto al prelievo (infermiere professionale o biologo addetto al
                prelievo). La fase analitica verrà effettuata mediante l’utilizzo di metodiche PCR a mezzo "Amplificatore delle catene genetiche"
          </p>
          <h4>Possibili risultati del test:</h4>  
          <ul>
            <li>Risultato NEGATIVO: non risultano infezioni in corso da virus SARS Cov-2</li>
            <li>Risultato POSITIVO: risulta in corso un’infezione da virus SARS Cov-2</li>
            <li>Risultato INDETERMINATO: la carica virale è bassa</li>
            <li>Risultato NON IDONEO: il materiale raccolto è di scarsa qualità e non sufficiente per l’esame, per cui va ripetuto il prelievo</li>
          </ul>
          <h4>Limiti del test</h4>  
          <p>Il risultato del test è attendibile con una specificità del 95%, non è del tutto esclusa la possibilità che il test generi falsi positivi o falsi negativi. Inoltre, il test “fotografa” la situazione in un determinato momento; è 
              comunque possibile, anche in caso di negatività, che vi sia un’infezione in corso in fase iniziale o che si possa venire infettati in un momento successivo al test.
          </p>

      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'informativa',
});
</script>