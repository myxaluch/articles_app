FROM ruby:4.0.1-slim

RUN apt-get update -qq && apt-get install -y build-essential libsqlite3-dev

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 9292

CMD ["sh", "-c", "bundle exec rake db:migrate && bundle exec puma -C puma.rb"]
