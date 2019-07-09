/*
 * AddMemberModal Messages
 *
 * This contains all the text for the AddMemberModal component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.AddMemberModal'

export default defineMessages({
  addMember: {
    id: `${scope}.addMember`,
    defaultMessage: 'Add Member',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'Validate',
  },
  fullName: {
    id: `${scope}.fullName`,
    defaultMessage: 'Full Name',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search by email or name',
  },
  photo: {
    id: `${scope}.photo`,
    defaultMessage: 'Photo',
  },
  upload: {
    id: `${scope}.upload`,
    defaultMessage: 'Click to upload',
  },
  searchError: {
    id: `${scope}.searchError`,
    defaultMessage: 'Please input an email or a user name',
  },
  lastNameError: {
    id: `${scope}.lastNameError`,
    defaultMessage: 'Please input the last name!',
  },
  roleError: {
    id: `${scope}.roleError`,
    defaultMessage: 'Please input the member role!',
  },
  photoError: {
    id: `${scope}.photoError`,
    defaultMessage: 'Please input the member photo!',
  },
})
