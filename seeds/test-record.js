
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jsons').del()
    .then(function () {
      // Inserts seed entries
      return knex('jsons').insert([
        {
          jsonpath: "x4z35solRfSNx8s/48a167ac974cf4faffc27ebd538dc950",
          ip: "127.0.0.1",
          json: `[{"data":"U2FsdGVkX1+L1T3MGQ/bhCEpY0+txz2KVfAO38qXhQ+MvZ6IbnQ2R+clJMMJba2t76W1UZ7vtvPIFVe9irSXscK8btnCUQPFMpGGJtk1TPlcnhIDLhlCAMIOJB0l/gM0ZmcEXSYYNF2uCa5QHNHExWzRU7397NTTqO+9dp757Lw="},{"data":"U2FsdGVkX1/42/jUxGX+S2j3DZjKg0Dkhpaix7XF8nt6w/UqrHfUNu4B9MFYLwtC9DUVuBo5RETPaFjSD9hwpR5NcMv5tL/siOhjCJvUI9mDgX71wrcrSx24rGn2Iz3J61V0Fx9QJheFzHfCiSg8TlPY73RIqYHmuIORdJTxtqE="},{"data":"U2FsdGVkX1+SduFdERiyjjIaH4xIVr/pel+FlH2YBWDeWPZK0C1melc8uZ+YRuNHqjkdKwA9MDRfr2O7dUiAoN8mazpKz45hNLmoMkhK62AVByUJxdafGYOi6/hC9pbUQq6DOB9gvUxT9/Yg2ImiCnnwcNlAoGv1YoX84K9C+m0wUctHUt5bhIn65qw60J+r"},{"data":"U2FsdGVkX18OVGMa4rUp+64posAtIkeXDo1RCyCoe7fVEP8Go7meDgahpFkaOWbiVKZo8NmmDN/1m2jFJtXZIJpwbncdNz6fxf4PRoHPHNPGkqu5tTM/PnaacVflfuLqvO8fgXYuNs3A2PJJnuNuDUE022FIi9TotK72k6um/GA="},{"data":"U2FsdGVkX19JbfVLksTact3qrGU7rtps6milzFD38jx1gXOQnTfJtENXS2ICqCgs6HHYFzItaGkx8BqVKF3vSCRRWN9EIl2XhhqV2XC+wBtHVor8wJze+V3/I7rtJrhFa/gSLF7XWj7UIf/JZ63b+JRR7M+Kg2Oq0E06WOF8jOs="},{"data":"U2FsdGVkX19RDvEVK+lR0OmRl8qoLacwUYX1sxz6e/2pI8MnwvYZstmej8gTWoewdrO3TMv/W6JndpUMhGafB3tIDF+DgFzVnhZp7TK+GMAhH2KUfq8l1f8dOXGvjuw6vaXt+yLUq1doTCP8QZzAWwwsh9SpARoTCwM8i/rPkM0="}]`
        },
      ]);
    });
};
