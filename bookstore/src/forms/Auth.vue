<template>
    <div>
      <v-jumbotron color="teal" dark height="50px">
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>
              <h3 class="display-1">
                {{ $t(`${action}.title`) }}
              </h3>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>

      <v-form id="nativeForm" v-model="valid">
        <v-text-field
          :label="$t('auth.email')"
          v-model="email"
          :rules="emailRules"
          name="email"
        />

        <v-text-field
          :label="$t('auth.password')"
          v-model="password"
          :rules="passwordRules"
          name="password"
          type="password"
        />

        <v-text-field
          v-if="action === 'register'"
          :label="$t('auth.password_confirmation')"
          v-model="password_confirmation"
          :rules="passwordConfirmationRules"
          name="password_confirmation"
          type="password"
        />

        <v-btn @click="submit" color="teal" dark :disabled="!valid">
          {{ $t(`${action}.submit`) }}
        </v-btn>

      </v-form>

    </div>
</template>

<script>
	export default {
		name: "auth-form",
    props: {
		  action: ''
    },
    data () {
		  return {
		    valid: false,
        email: '',
        emailRules: [
          (v) => !!v || this.$t('validations.required', {field: 'E-mail'}),
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('validations.email', {field: 'E-mail'})
        ],
        password: '',
        passwordRules: [
          (v) => !!v || this.$t('validations.required', {field: 'Password'}),
          (v) => v.length >= 6 || this.$t('validations.minLength', {field: 'Password', length: 6})
        ],
        password_confirmation: '',
        passwordConfirmationRules: [
          (v) => !!v || this.$t('validations.required', {field: 'Password'}),
          (v) => v.length >= 6 || this.$t('validations.minLength', {field: 'Password', length: 6}),
          (v) => v === this.password || this.$t('validations.password_confirmation'),
        ]
      }
    },
    methods: {
		  submit () {
		    this.$emit('process', {email: this.email, password: this.password});
      }
    }
	}
</script>
