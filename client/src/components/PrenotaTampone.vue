<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 480px; max-width: 100%">
      <q-form @submit.prevent="doPrenotazione">
        <q-card-section>
          <div class="text-h6">Prenota Tampone</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="col q-gutter-md">
          <q-input
            v-if="state.tipo_utente == 2 || state.tipo_utente == 3"
            v-model="register.nome"
            outlined
            label="Nome"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
          <q-input
            v-if="state.tipo_utente == 2 || state.tipo_utente == 3"
            v-model="register.cognome"
            outlined
            label="Cognome"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
          <q-input
            v-if="state.tipo_utente == 2 || state.tipo_utente == 3"
            v-model="register.codicefiscale"
            outlined
            label="Codice Fiscale"
            mask="AAAAAA##A##A###A"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
          <q-select
            v-model="tipotampone"
            outlined
            label="Tipo di Tampone"
            :options="options"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
          <q-select
            v-model="provincia"
            outlined
            emit-value
            map-options
            label="Provincia"
            :options="optionsProvince"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
          <q-select
            v-model="id_laboratorio"
            outlined
            label="Laboratorio"
            option-value="uid"
            option-label="nome"
            emit-value
            map-options
            :options="optionsLaboratori"
            :rules="[(val) => !!val || 'Campo Richiesto']"
            @filter="getLabs"
          >
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.nome }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.citta }} ({{ scope.opt.provincia }})</q-item-label>
                  <q-item-label caption>{{ scope.opt.indirizzo }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-date v-model="data" :landscape="$q.screen.gt.md" :options="dateDispo" />

          <q-select
            v-if="state.tipo_utente == 1 || state.tipo_utente == 3"
            v-model="register.pagamento"
            outlined
            label="Tipo di Pagamento"
            :options="optionsPayment"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
          <q-input
            v-if="register.pagamento == 'Online'"
            v-model="register.nomeintestatario"
            outlined
            label="Nome intestatario della carta"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
          <q-input
            v-if="register.pagamento == 'Online'"
            v-model="register.numerocarta"
            outlined
            label="Numero carta"
            mask="#### #### #### ####"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
          <q-input
            v-if="register.pagamento == 'Online'"
            v-model="register.datascadenza"
            outlined
            label="Data scadenza"
            mask="##/##"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
          <q-input
            v-if="register.pagamento == 'Online'"
            v-model="register.cvv"
            outlined
            label="CVV"
            mask="###"
            :rules="[(val) => !!val || 'Campo Richiesto']"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Compila Questionario</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-ma-xs">
          <text-subtitle1>1) Attualmente è malato?</text-subtitle1>
          <q-option-group
            v-model="register.malato"
            name="malato"
            :options="option"
            color="primary"
            inline
          ></q-option-group>

          <text-subtitle1>2) Ha febbre?</text-subtitle1>
          <q-option-group
            v-model="register.febbre"
            name="febbre"
            :options="option"
            color="primary"
            inline
          ></q-option-group>

          <text-subtitle1
            >3) Soffre di allergie al lattice, a qualche cibo, a farmaci o ai componenti del vaccino?
          </text-subtitle1>

          <q-option-group
            v-model="register.allergie"
            name="allergie"
            :options="option"
            color="primary"
            inline
          ></q-option-group>

          <text-subtitle1
            >4) Soffre di malattie cardiache o polmonari, asma, malatte renali, diabete, anemia o altre malattie del
            sangue?
          </text-subtitle1>
          <q-option-group
            v-model="register.malattieGravi"
            name="malattieGravi"
            :options="option"
            color="primary"
            inline
          ></q-option-group>

          <text-subtitle1
            >5) Si trova in una condizione di compromissione del sistema immunitario? (Esempio: cancro, leucemia,
            linfoma, HIV/AIDS, trapianto)?
          </text-subtitle1>
          <q-option-group
            v-model="register.compromissioniSistema"
            name="compromissioni sistema immunitario"
            :options="option"
            color="primary"
            inline
          ></q-option-group>

          <text-subtitle1
            >6) Negli ultimi 3 mesi, ha assunto farmaci che indeboliscono il sistema immunitario (esempio: cortisone,
            prednisone o altri steroidi) o farmaci antitumorali, oppure ha subito trattamenti con radiazioni?
          </text-subtitle1>
          <q-option-group
            v-model="register.assunzioneFarmaci"
            name="farmaci"
            :options="option"
            color="primary"
            inline
          ></q-option-group>
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup label="Annulla" color="grey" flat />
          <q-btn type="submit" color="primary" label="Prenota" flat />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useQuasar, useDialogPluginComponent, date } from 'quasar';
import firebase from 'firebase/app';
import { db } from 'boot/firebase';
import { useState } from 'src/modules/useState.js';

export default defineComponent({
  name: 'PrenotaTampone',
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogOK, onDialogHide } = useDialogPluginComponent();
    const $q = useQuasar();
    const state = useState();

    const tipotampone = ref('');
    const provincia = ref('');
    const id_laboratorio = ref('');
    const data = ref('');
    const register = ref({});

    const optionsProvince = ref([]);

    db.collection('province')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          optionsProvince.value.push(doc.data());
        });
      });

    watch(provincia, () => {
      optionsLaboratori.value = [];
      dateDispo.value = [];
      id_laboratorio.value = '';
      data.value = '';
    });

    const optionsLaboratori = ref([]);
    const getLabs = (val, update, abort) => {
      if (provincia.value.length < 2) {
        abort();
        return;
      }

      db.collection('users')
        .where('tipo_utente', '==', 4)
        .where('provincia', '==', provincia.value)
        .get()
        .then((querySnapshot) => {
          update(() => {
            optionsLaboratori.value = [];
            querySnapshot.forEach((doc) => {
              optionsLaboratori.value.push(doc.data());
            });
          });
        });
    };

    const dateDispo = ref([]);
    watch(id_laboratorio, async () => {
      dateDispo.value = [];
      db.collection('calendari')
        .where('id_laboratorio', '==', id_laboratorio.value)
        .where('data', '>=', firebase.firestore.Timestamp.fromDate(date.startOfDate(new Date(), 'day')))
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            dateDispo.value.push(date.formatDate(doc.data().data.toDate(), 'YYYY/MM/DD'));
          });
        })
        .catch((error) => {
          console.log(error);
          dateDispo.value = [];
        });
    });

    const doPrenotazione = async () => {
      if (!data.value || data.value.length < 4) {
        $q.notify({
          type: 'negative',
          position: 'top',
          message: 'Selezionare una data!',
        });
        return;
      }

      try {
        if (state.value.tipo_utente == 1) {
          if (register.value.pagamento == 'Online') {
            await db.collection('prenotazioni').add({
              prenotatoda: state.value.id,
              tipotampone: tipotampone.value,
              id_laboratorio: id_laboratorio.value,
              data: firebase.firestore.Timestamp.fromDate(date.extractDate(data.value, 'YYYY/MM/DD')),
              nome: state.value.nome,
              cognome: state.value.cognome,
              codicefiscale: state.value.cf,
              nomeintestatario: register.value.nomeintestatario,
              numerocarta: register.value.numerocarta,
              datascadenza: register.value.datascadenza,
              cvv: register.value.cvv,
              confermato: 0,
              esito: null,
              //Questionario
              malato: register.value.malato,
              febbre: register.value.febbre,
              allergie: register.value.allergie,
              malattieGravi: register.value.malattieGravi,
              compromissioniSistema: register.value.compromissioniSistema,
              assunzioneFarmaci: register.value.assunzioneFarmaci,
            });
          } else {
            await db.collection('prenotazioni').add({
              prenotatoda: state.value.id,
              tipotampone: tipotampone.value,
              id_laboratorio: id_laboratorio.value,
              data: firebase.firestore.Timestamp.fromDate(date.extractDate(data.value, 'YYYY/MM/DD')),
              nome: state.value.nome,
              cognome: state.value.cognome,
              codicefiscale: state.value.cf,
              confermato: 0,
              esito: null,
              //Questionario
              malato: register.value.malato,
              febbre: register.value.febbre,
              allergie: register.value.allergie,
              malattieGravi: register.value.malattieGravi,
              compromissioniSistema: register.value.compromissioniSistema,
              assunzioneFarmaci: register.value.assunzioneFarmaci,
            });
          }
        } else if (state.value.tipo_utente == 2) {
          await db.collection('prenotazioni').add({
            prenotatoda: state.value.id,
            tipotampone: tipotampone.value,
            id_laboratorio: id_laboratorio.value,
            data: firebase.firestore.Timestamp.fromDate(date.extractDate(data.value, 'YYYY/MM/DD')),
            nome: register.value.nome,
            cognome: register.value.cognome,
            codicefiscale: register.value.codicefiscale,
            confermato: 0,
            esito: null,
            //Questionario
            malato: register.value.malato,
            febbre: register.value.febbre,
            allergie: register.value.allergie,
            malattieGravi: register.value.malattieGravi,
            compromissioniSistema: register.value.compromissioniSistema,
            assunzioneFarmaci: register.value.assunzioneFarmaci,
          });
        } else if (state.value.tipo_utente == 3) {
          if (register.value.pagamento == 'Online') {
            await db.collection('prenotazioni').add({
              prenotatoda: state.value.id,
              tipotampone: tipotampone.value,
              id_laboratorio: id_laboratorio.value,
              data: firebase.firestore.Timestamp.fromDate(date.extractDate(data.value, 'YYYY/MM/DD')),
              nome: register.value.nome,
              cognome: register.value.cognome,
              codicefiscale: register.value.codicefiscale,
              nomeintestatario: register.value.nomeintestatario,
              numerocarta: register.value.numerocarta,
              datascadenza: register.value.datascadenza,
              cvv: register.value.cvv,
              confermato: 0,
              esito: null,
              //Questionario
              malato: register.value.malato,
              febbre: register.value.febbre,
              allergie: register.value.allergie,
              malattieGravi: register.value.malattieGravi,
              compromissioniSistema: register.value.compromissioniSistema,
              assunzioneFarmaci: register.value.assunzioneFarmaci,
            });
          } else {
            await db.collection('prenotazioni').add({
              prenotatoda: state.value.id,
              tipotampone: tipotampone.value,
              id_laboratorio: id_laboratorio.value,
              data: firebase.firestore.Timestamp.fromDate(date.extractDate(data.value, 'YYYY/MM/DD')),
              nome: register.value.nome,
              cognome: register.value.cognome,
              codicefiscale: register.value.codicefiscale,
              confermato: 0,
              esito: null,
              //Questionario
              malato: register.value.malato,
              febbre: register.value.febbre,
              allergie: register.value.allergie,
              malattieGravi: register.value.malattieGravi,
              compromissioniSistema: register.value.compromissioniSistema,
              assunzioneFarmaci: register.value.assunzioneFarmaci,
            });
          }
        }

        onDialogOK();
        $q.notify({
          type: 'positive',
          position: 'top',
          message: 'Prenotazione registrata',
          forever: true,
        });
      } catch (error) {
        $q.notify({
          type: 'negative',
          position: 'top',
          message: 'Errore salvataggio Dati!',
        });
        console.log(error);
      }
    };

    return {
      dateDispo,
      dialogRef,
      onDialogOK,
      onDialogHide,
      options: ['Molecolare', 'Antigenico'],
      optionsProvince,
      optionsLaboratori,
      optionsPayment: ['Online', 'In Struttura'],
      option: [
        {
          label: 'Si',
          value: true,
        },
        {
          label: 'No',
          value: false,
        },
        {
          label: 'Non lo so',
          value: null,
        },
      ],
      getLabs,
      tipotampone,
      provincia,
      id_laboratorio,
      data,
      doPrenotazione,
      register,
      state,
    };
  },
});
</script>
