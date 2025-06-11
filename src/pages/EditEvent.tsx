import { useState } from 'react';
import { useParams } from 'react-router';
import { updateEventById } from '../api/services/events.ts';
import { useEventById } from '../hooks/useEventById.ts';

import '../styles/home.css';
import NavBar from '../components/major/nav-bar';
import FormInput from '../components/minor/FormInput';

import { Event } from 'models/event.model.ts';

export default function EditEvent() {
  let { id } = useParams();
  if (id === undefined) id = '';

  const eventId: string = id;
  const { event } = useEventById(eventId);
  const [formData, setFormData] = useState<Event | null>(null);
  const [message, setMessage] = useState('');

  if (!event) return;

  if (formData === null) {
    const data: Event = {
      mode: event.mode,
      name: event.name,
      description: event.description,
      location: event.location,
      date: event.date,
      price: event.price,
      distance: event.distance,
      url: event.url,
    };

    setFormData(data);
  }

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevState) =>
      prevState ? { ...prevState, [name]: value } : null,
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData) return;

    const result = await updateEventById(eventId, formData);
    if (result && result.message) setMessage(result.message);
  }

  return (
    <div>
      <NavBar />

      <div className="flex min-h-screen">
        <div className="m-auto w-full max-w-md px-4">
          <div className="border-b-3 border-t-3">
            <div className="flex mt-3 mb-3">
              <form
                className="inline-block m-auto"
                onChange={handleChange}
                onSubmit={handleSubmit}
              >
                <FormInput
                  name="mode"
                  label="Mode"
                  def={event.mode}
                ></FormInput>

                <FormInput
                  name="name"
                  label="Name"
                  def={event.name}
                ></FormInput>

                <FormInput
                  name="description"
                  label="Description"
                  def={event.description}
                ></FormInput>

                <FormInput
                  name="location"
                  label="Location"
                  def={event.location}
                ></FormInput>

                <FormInput
                  name="date"
                  label="Date"
                  def={event.date}
                ></FormInput>
                <FormInput
                  name="price"
                  label="Price"
                  def={event.price}
                  type="number"
                ></FormInput>

                <FormInput
                  name="distance"
                  label="Distance"
                  def={event.distance}
                  type="number"
                ></FormInput>

                <FormInput name="url" label="URL" def={event.url}></FormInput>

                <div>
                  <input
                    className="uppercase w-full text-[var(--color-text)] border border-[var(--color-text)]"
                    type="submit"
                    value="Update Event"
                  ></input>
                </div>
              </form>
            </div>
          </div>
          {message && (
            <div className="font-semibold min-h-[3.5rem] text-[var(--color-text)] whitespace-pre-line text-center mt-5">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
