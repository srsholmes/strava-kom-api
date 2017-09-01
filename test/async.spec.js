import test from 'tape';
import sinon from 'sinon';
import { asyncFunc } from '../src';

test('asyncFunc', async t => {
  t.plan(1);
  const event = { event: 'event' };
  const spy = sinon.spy();

  const expected = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello AWS async lambda',
      input: event,
      test: { a: 51, b: 60 },
    }),
  };

  await asyncFunc(event, null, spy);
  t.ok(spy.calledWith(null, expected), 'The function should return the spy with the expected result');
});
