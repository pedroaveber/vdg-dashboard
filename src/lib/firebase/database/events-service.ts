import { FirestoreDatabase } from '.'

interface ConstructorProps {
  collection: string
  bucket: string
}

class EventsClass extends FirestoreDatabase {
  constructor({ collection, bucket }: ConstructorProps) {
    super({ collection, bucket })
  }
}

export const EventsService = new EventsClass({
  bucket: 'events',
  collection: 'events',
})
