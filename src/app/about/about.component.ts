import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public form: FormGroup;
  public contactList: FormArray;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      organization: [null],
      contacts: this.fb.array([this.createContact()])
    });
  
  // set contactlist to the form control containing contacts
    this.contactList = this.form.get('contacts') as FormArray;
  }


  createContact(): FormGroup {
    return this.fb.group({
      type: ['email', Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      value: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

 // add a contact form group
addContact() {
  this.contactList.push(this.createContact());
}


// remove contact from group
removeContact(index) {
  this.contactList.removeAt(index);
}


changedFieldType(index) {
  let validators = null;

if (this.getContactsFormGroup(index).controls['type'].value === 'email') {
    validators = Validators.compose([Validators.required, Validators.email]);
  } else {
    validators = Validators.compose([
      Validators.required,
      Validators.pattern(new RegExp('^\\\+[0-9]?()[0-9](\d[0-9]{9})\$')) // pattern for validating international phone number
    ]);
  }

this.getContactsFormGroup(index).controls['value'].setValidators(validators);

// re-validate the inputs of the form control based on new validation
  this.getContactsFormGroup(index).controls['value'].updateValueAndValidity();
}

 // get the formgroup under contacts form array
 getContactsFormGroup(index): FormGroup {
  // this.contactList = this.form.get('contacts') as FormArray;
  const formGroup = this.contactList.controls[index] as FormGroup;
  return formGroup;
}

get contactFormGroup() {
  return this.form.get('contacts') as FormArray;
}

  // method triggered when form is submitted
  submit() {
    console.log(this.form.value);
  }

}
