/*
 * AsideBar Messages
 *
 * This contains all the text for the AsideBar component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.AsideBar'

export default defineMessages({
  learningStyles: {
    id: `${scope}.learningStyles`,
    defaultMessage: 'Learning Styles',
  },
  assessments: {
    id: `${scope}.assessments`,
    defaultMessage: 'Assessments',
  },
  keywords: {
    id: `${scope}.keywords`,
    defaultMessage: 'Keywords',
  },
  keywordName: {
    id: `${scope}.keywordName`,
    defaultMessage: 'Keyword Name',
  },
  keywordLink: {
    id: `${scope}.keywordLink`,
    defaultMessage: 'Keyword Link',
  },
  confirmMessageLS: {
    id: `${scope}.confirmMessageLS`,
    defaultMessage: 'Are you sure to delete this learning style?',
  },
  confirmMessageAss: {
    id: `${scope}.confirmMessageAss`,
    defaultMessage: 'Are you sure to delete this assessment?',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },

  addKeyword: {
    id: `${scope}.addKeyword`,
    defaultMessage: 'Add keyword',
  },
  updateKeyword: {
    id: `${scope}.updateKeyword`,
    defaultMessage: 'Update keyword',
  },
  openTheLink: {
    id: `${scope}.openTheLink`,
    defaultMessage: 'Open The Link',
  },
  asFirstStep: {
    id: `${scope}.asFirstStep`,
    defaultMessage: 'As a first step, add a learning Style',
  },
})
