<template>
    <div>
        <v-container grid-list-xs height="1000">
            <v-row>
                <v-col>

                </v-col>
                <v-col cols="12" xs="12" sm="12" md="6" lg="4">
                    <v-card class="px-5 py-10  text-center">
                        <div class="text-h3">
                            Login
                        </div>
                        <v-container grid-list-xs>
                            <v-form class="mt-5">
                                <div v-for="(textfield,index) in textfields" :key="index">
                                    <v-text-field solo :placeholder="textfield.placeholder" :label="textfield.label"
                                        :type="textfield.InputType" v-model="UserInputs[textfield.name]"></v-text-field>
                                </div>
                                <div class="justify-start text-start">
                                    <div class="text-subtitle-2" color="primary"> Forgot password? </div>
                                </div>
                                <div class="mt-5 justify-space-between">
                                    <v-btn color="primary" class="my-3" block large>Login</v-btn>
                                    <hr>
                                    <v-btn color="primary" class="mt-3" block large @click="modalValue= !modalValue">Create an account</v-btn>
                                </div>

                            </v-form>
                            <v-dialog
                                transition="dialog-top-transition"
                                ref="dialogRef"
                                v-model="modalValue"
                                lazy
                                full-width
                                width="600"
                            >
                            <Register @pressedCancel="closeDialog" ></Register>
                            </v-dialog>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    const Register = ()=> import('../components/Register.vue')
    export default {
        components:{Register},
        methods: {
            closeDialog(){
                this.modalValue= !this.modalValue
            }
        },
        data() {
            return {
                textfields: [{
                        name: 'username',
                        InputType: 'text',
                        placeholder: 'Username',
                        label: 'Username',
                    },
                    {
                        name: 'password',
                        InputType: 'password',
                        placeholder: 'Password',
                        label: 'Password',
                        model: '',
                    }
                ],
                UserInputs: {
                    username: '',
                    password: ''
                },
                modalValue:false
            }
        },
    }
</script>