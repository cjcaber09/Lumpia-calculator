<template>
    <v-card class="px-10 py-15" >
            <div class="text-h5 text-center">
                Register account
            </div>
            <v-form class="mt-5">
                                <div v-for="(textfield,index) in textfields" :key="index">
                                    <v-text-field solo :placeholder="textfield.label" :label="textfield.label"
                                        :type="textfield.InputType" v-model="UserInputs[textfield.name]"></v-text-field>
                                </div>
                                <div class="justify-start text-start">
                                    <div class="text-subtitle-2" color="primary"> Forgot password? </div>
                                </div>
                                <div class="mt-5 justify-space-between">
                                    <v-btn color="primary" class="my-3" block large>Submit</v-btn>
                                    <hr>
                                    <v-btn color="secondary" class="mt-3" block large @click="closeDialog">Cancel</v-btn>
                                </div>

                            </v-form>
        </v-card>
</template>

<script>
    export default{
        methods: {
            closeDialog(){
                this.$emit('pressedCancel')
            },
        },
        data() {
            return {
                
                textfields: [{
                        name: 'username',
                        InputType: 'text',
                        placeholder: 'Username',
                        model: 'username',
                        label: 'Username',
                    },{
                        name: 'fname',
                        InputType: 'text',
                        model: 'fname',
                        label: 'First name',
                    },{
                        name: 'lname',
                        InputType: 'text',
                        model: 'lname',
                        label: 'Last name',
                    },
                   {
                        name: 'email',
                        InputType: 'email',
                        model: 'lname',
                        label: 'Email Address',
                    },
                    {
                        name: 'password',
                        InputType: 'password',
                        placeholder: 'Password',
                        label: 'Password',
                        model: 'password',
                    },{
                        name: 'confirm_password',
                        InputType: 'password',
                        placeholder: 'Confirm Password',
                        label: 'Confirm Password',
                        model: 'cpassword',
                    }
                ],
                UserInputs: {
                    username: '',
                    password: '',
                    cpassword: ''
                },
            }
        },
    }
</script>