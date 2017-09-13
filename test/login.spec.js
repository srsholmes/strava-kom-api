import test from 'tape';
import sinon from 'sinon';
import { login } from '../src';


//TODO: Fix tests
test('login', t => {
  t.plan(1);
  const event = { event: 'event' };
  const a = { hello: 'world', };
  const b = { world: 'login', };
  const spy = sinon.spy();

  const expected = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello AWS Lambda',
      input: event,
      spreadTest: { ...a, ...b },
    }),
  };

  login(event, null, spy);
  t.ok(spy.calledWith(null, expected), 'The function should return the spy with the expected result');
});
