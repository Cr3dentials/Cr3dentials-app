import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

import type { EditInvoiceById, UpdateInvoiceInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormInvoice = NonNullable<EditInvoiceById['invoice']>

interface InvoiceFormProps {
  invoice?: EditInvoiceById['invoice']
  onSave: (data: UpdateInvoiceInput, id?: FormInvoice['id']) => void
  error: RWGqlError
  loading: boolean
}

const InvoiceForm = (props: InvoiceFormProps) => {
  const onSubmit = (data: FormInvoice) => {
    props.onSave(data, props?.invoice?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormInvoice> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Amount
        </Label>

        <TextField
          name="amount"
          defaultValue={props.invoice?.amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="amount" className="rw-field-error" />

        <Label
          name="dueDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Due date
        </Label>

        <DatetimeLocalField
          name="dueDate"
          defaultValue={formatDatetime(props.invoice?.dueDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dueDate" className="rw-field-error" />

        <Label
          name="payerEmail"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Payer email
        </Label>

        <TextField
          name="payerEmail"
          defaultValue={props.invoice?.payerEmail}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="payerEmail" className="rw-field-error" />

        <Label
          name="payerPhone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Payer phone
        </Label>

        <TextField
          name="payerPhone"
          defaultValue={props.invoice?.payerPhone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="payerPhone" className="rw-field-error" />

        <Label
          name="currency"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Currency
        </Label>

        <TextField
          name="currency"
          defaultValue={props.invoice?.currency}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="currency" className="rw-field-error" />

        <Label
          name="lateFee"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Late fee
        </Label>

        <TextField
          name="lateFee"
          defaultValue={props.invoice?.lateFee}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true }}
        />

        <FieldError name="lateFee" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.invoice?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default InvoiceForm
