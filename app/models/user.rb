class User < ApplicationRecord
  has_secure_password

  validates :session_token, 
    presence: true, 
    uniqueness: true
  validates :password, 
    length: { minimum: 6 }, 
    allow_nil: true
  validates :first_name, :last_name, 
    presence: true
  validates :username,
    length: { in: 3..30 },
    uniqueness: true,
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "username can't be an email" }
  validates :email,
    length: { in: 6..255 },
    uniqueness: true,
    format: { with: URI::MailTo::EMAIL_REGEXP }

  after_initialize :ensure_session_token

  def self.find_by_credentials(credential, password)
    column = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username

    user = User.find_by(column => credential)
    user&.authenticate(password)
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save
    self.session_token
  end

  private

  def generate_unique_session_token
    while true
      token = SecureRandom::urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end



end
